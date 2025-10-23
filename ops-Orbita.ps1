param(
  [ValidateSet("tokens","fonts","images","seo","favicon","all")]
  [string]$Mode = "all",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$RepoRoot = (Resolve-Path ".").Path
$TimeTag  = (Get-Date -Format "yyyyMMdd-HHmmss")
$Report   = Join-Path $RepoRoot ("ops-report-{0}.csv" -f $TimeTag)
$null = New-Item -ItemType File -Path $Report -Force

function Write-Step($msg){ Write-Host "› $msg" -ForegroundColor Cyan }
function Write-OK($msg){ Write-Host "✓ $msg" -ForegroundColor Green }
function Write-Warn($msg){ Write-Host "• $msg" -ForegroundColor Yellow }
function Write-Fail($msg){ Write-Host "× $msg" -ForegroundColor Red }

function Add-Report($area,$action,$file,$details){
  '"{0}","{1}","{2}","{3}"' -f $area,$action,($file -replace '"','""'),($details -replace '"','""') | Out-File -FilePath $Report -Append -Encoding utf8
}

function Ensure-Dir($path){
  if(-not (Test-Path $path)){ if(-not $DryRun){ New-Item -ItemType Directory -Path $path -Force | Out-Null }; Add-Report "fs","mkdir",$path,"created" }
}

function Backup-File($file){
  if(Test-Path $file){
    $bak = "$file.$TimeTag.bak"
    if(-not $DryRun){ Copy-Item $file $bak -Force }
    Add-Report "backup","copy",$file,"-> $bak"
    return $bak
  }
  return $null
}

function Ensure-File($file,$content){
  $dir = Split-Path $file -Parent
  Ensure-Dir $dir
  if(-not (Test-Path $file)){
    if(-not $DryRun){ $content | Out-File -FilePath $file -Encoding utf8 -Force }
    Add-Report "fs","create",$file,"new file"
    Write-OK "Creado $file"
  } else {
    Write-Warn "$file ya existe"
  }
}

function Replace-InFile($file,[regex]$pattern,$replacement){
  if(-not (Test-Path $file)){ return $false }
  if($null -eq $replacement){ Write-Warn "Replace-InFile: replacement null, abortado."; return $false }
  $orig = Get-Content $file -Raw -Encoding utf8
  $new  = $pattern.Replace($orig,$replacement)
  if($new -ne $orig){
    Backup-File $file | Out-Null
    if(-not $DryRun){ $new | Out-File -FilePath $file -Encoding utf8 -Force }
    Add-Report "edit","regex",$file,"pattern=$($pattern.ToString())"
    Write-OK "Editado $file"
    return $true
  } else {
    Write-Warn "Sin cambios en $file"
    return $false
  }
}

function Insert-Once($file,$needleRegex,$insertBlock,$anchorRegex,[switch]$before){
  if(-not (Test-Path $file)){ return $false }
  $txt = Get-Content $file -Raw -Encoding utf8
  if([regex]::IsMatch($txt,$needleRegex, 'IgnoreCase')){ Write-Warn "Bloque ya presente en $file"; return $false }
  $anchor = [regex]::Match($txt,$anchorRegex,'IgnoreCase')
  if(!$anchor.Success){ Write-Fail "Anchor no encontrado en $file"; return $false }
  $start = $anchor.Index
  $end   = $anchor.Index + $anchor.Length
  $new = if($before){ $txt.Substring(0,$start) + $insertBlock + $txt.Substring($start) }
         else { $txt.Substring(0,$end) + $insertBlock + $txt.Substring($end) }
  Backup-File $file | Out-Null
  if(-not $DryRun){ $new | Out-File -FilePath $file -Encoding utf8 -Force }
  Add-Report "edit","insert",$file,"after anchor"
  Write-OK "Insertado bloque en $file"
  return $true
}

function Do-Tokens {
  Write-Step "Tokens: crear app/tokens.css y vincular en globals.css; normalizar hex conocidos."
  $tokensPath = Join-Path $RepoRoot "app/tokens.css"
  $tokensCss = @"
/* AUTOGENERADO: tokens Òrbita */
:root{
  --oe-black:#0a0a0b; --oe-black-2:#0b0c0d; --oe-gold:#d7b86e;
  --oe-amber:#ffbb33; --oe-magenta:#b62fbf; --oe-white:#f5f5f5; --oe-gray:#9ca3af;
  --r1:0.5rem; --r2:1rem; --r3:1.5rem;
  --shadow-soft:0 10px 30px rgba(0,0,0,.25);
  --shadow-hard:0 4px 12px rgba(0,0,0,.4);
}
.bg-main{ background: linear-gradient(180deg,#0a0a0b 0%,#0b0c0d 100%); }
.gold-glow{ background: radial-gradient(circle at 50% 50%, rgba(215,184,110,.35) 0%, rgba(10,10,11,0) 60%); }
"@
  Ensure-File $tokensPath $tokensCss

  $globals = Join-Path $RepoRoot "app/globals.css"
  if(Test-Path $globals){
    $raw = Get-Content $globals -Raw -Encoding utf8
    if($raw -notmatch '(?m)^\s*@import\s+"\.\/tokens\.css";'){
      $repl = '$1@import "./tokens.css";' + [Environment]::NewLine
      $new = $raw -replace '(?m)^(\s*@tailwind\s+base;\s*)', $repl
      Backup-File $globals | Out-Null
      if(-not $DryRun){ $new | Out-File -FilePath $globals -Encoding utf8 -Force }
      Add-Report "edit","insert-import",$globals,"@import ./tokens.css"
      Write-OK "Añadido @import ./tokens.css a globals.css"
    } else {
      Write-Warn "globals.css ya tenía @import ./tokens.css"
    }
  } else { Write-Fail "app/globals.css no existe." }

  $targets = @("app","components") | ForEach-Object { Join-Path $RepoRoot $_ }
  $hexRegex = '#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})\b'
  $map = @{
    "#0a0a0b"="var(--oe-black)"; "#0b0c0d"="var(--oe-black-2)"; "#d7b86e"="var(--oe-gold)";
    "#ffbb33"="var(--oe-amber)"; "#b62fbf"="var(--oe-magenta)"; "#f5f5f5"="var(--oe-white)"; "#9ca3af"="var(--oe-gray)"
  }
  foreach($dir in $targets){
    if(-not (Test-Path $dir)){ continue }
    Get-ChildItem $dir -Recurse -Include *.tsx,*.ts,*.css,*.scss,*.mdx | ForEach-Object {
      $content = Get-Content $_.FullName -Raw -Encoding utf8
      $matches = [regex]::Matches($content,$hexRegex)
      if($matches.Count -gt 0){
        $distinct = $matches.Value | Select-Object -Unique
        Add-Report "scan","hex", $_.FullName, ($distinct -join ' ')
        $new = $content
        foreach($hx in $distinct){
          $key = $hx.ToLower()
          if($map.ContainsKey($key)){
            $new = $new -replace [regex]::Escape($hx), $map[$key]
          }
        }
        if($new -ne $content){
          Backup-File $_.FullName | Out-Null
          if(-not $DryRun){ $new | Out-File -FilePath $_.FullName -Encoding utf8 -Force }
          Add-Report "edit","hex->var()", $_.FullName, "mapped known palette"
          Write-OK ("Normalizados colores en {0}" -f $_.Name)
        }
      }
    }
  }
  Write-OK "Tokens y limpieza completados."
}

function Do-Fonts {
  Write-Step "Fuentes: app/fonts.ts y variables en layout.tsx"
  $fontsPath = Join-Path $RepoRoot "app/fonts.ts"
  $fontsTs = @"
import { Inter, League_Spartan as LeagueSpartan, Outfit, Space_Grotesk as SpaceGrotesk } from "next/font/google";
export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const league = LeagueSpartan({ subsets: ["latin"], variable: "--font-league", weight: ["400","600","700"] });
export const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const space = SpaceGrotesk({ subsets: ["latin"], variable: "--font-space" });
"@
  Ensure-File $fontsPath $fontsTs

  $layout = Join-Path $RepoRoot "app/layout.tsx"
  if(Test-Path $layout){
    $txt = Get-Content $layout -Raw -Encoding utf8
    if($txt -notmatch 'import\s+\{\s*inter.*from\s+"\.\/fonts";'){
      $txt = $txt -replace '(?m)^((?:import .*?\n)+)', '$1' + 'import { inter, league, outfit, space } from "./fonts";' + [Environment]::NewLine
    }
    if($txt -notmatch '--font-inter'){
      $txt = $txt -replace '(?s)<html([^>]*)>', '<html$1 class="antialiased">'
      $txt = $txt -replace '(?s)<body([^>]*)>', '<body$1 class={`${inter.variable} ${league.variable} ${outfit.variable} ${space.variable}`}>' 
    }
    Backup-File $layout | Out-Null
    if(-not $DryRun){ $txt | Out-File -FilePath $layout -Encoding utf8 -Force }
    Add-Report "edit","fonts-classes",$layout,"variables applied"
    Write-OK "Fuentes aplicadas en layout.tsx"
  } else { Write-Fail "app/layout.tsx no existe." }
}

function Do-Images {
  Write-Step "Imágenes: inventario <img> para migración a next/image"
  $found = $false
  Get-ChildItem (Join-Path $RepoRoot "app") -Recurse -Include *.tsx,*.mdx -ErrorAction SilentlyContinue | ForEach-Object {
    $raw = Get-Content $_.FullName -Raw -Encoding utf8
    $imgs = [regex]::Matches($raw,'<img\s+[^>]*src=[''"][^''""]+[''"][^>]*>')
    if($imgs.Count -gt 0){
      $found = $true
      Add-Report "scan","img-tags", $_.FullName, "$($imgs.Count) tags"
    }
  }
  if($found){ Write-Warn "Hay <img> sueltos: revisa el CSV para priorizar LCP." } else { Write-OK "Sin <img> legacy." }
}

function Do-SEO {
  Write-Step "SEO: metadata base + JSON-LD"
  $layout = Join-Path $RepoRoot "app/layout.tsx"
  if(-not (Test-Path $layout)){ Write-Fail "layout.tsx no existe."; return }
  $txt = Get-Content $layout -Raw -Encoding utf8

  if($txt -notmatch 'export\s+const\s+metadata\s*='){
    $metaBlock = @"
export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbitaevents-prova.vercel.app"),
  title: { default: "Òrbita Events — Técnica, música y emoción", template: "%s · Òrbita Events" },
  description: "Productora técnica con foco en discomóvil, tematizaciones y bodas. Sonido limpio, luz bien diseñada y energía real.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title: "Òrbita Events — Técnica, música y emoción", description: "Eventos reales, hechos con las manos, la cabeza y el alma.", images: [{ url: "/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" }
} satisfies import("next").Metadata;
"@
    $txt = $txt -replace 'export\s+default\s+function\s+RootLayout',''+$metaBlock+"`nexport default function RootLayout"
  }

  if($txt -notmatch 'application/ld\+json'){
    $jsonLd = @"
      <script
        type=""application/ld+json""
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ""@context"": ""https://schema.org"",
            ""@type"": ""LocalBusiness"",
            ""name"": ""Òrbita Events"",
            ""url"": (process.env.NEXT_PUBLIC_SITE_URL ?? ""https://orbitaevents-prova.vercel.app""),
            ""address"": { ""addressLocality"": ""Granollers"", ""addressRegion"": ""Barcelona"", ""addressCountry"": ""ES"" }
          })
        }}
      />
"@
    $txt = $txt -replace '(?s)(<head>)(.*?)(</head>)', '$1$2' + $jsonLd + '$3'
  }

  Backup-File $layout | Out-Null
  if(-not $DryRun){ $txt | Out-File -FilePath $layout -Encoding utf8 -Force }
  Add-Report "edit","metadata+ld",$layout,"inserted/ensured"
  Write-OK "SEO listo en layout.tsx"
}

function Do-Favicon {
  Write-Step "Favicon: asegurar public/favicon.svg"
  $pub = Join-Path $RepoRoot "public"
  Ensure-Dir $pub
  $fav = Join-Path $pub "favicon.svg"
  if(-not (Test-Path $fav)){
@"
<svg xmlns=""http://www.w3.org/2000/svg"" viewBox=""0 0 64 64"">
  <circle cx=""32"" cy=""32"" r=""30"" fill=""#0a0a0b""/>
  <path d=""M16 36 L32 12 L48 36 L32 52 Z"" fill=""#d7b86e""/>
</svg>
"@ | ForEach-Object {
    if(-not $DryRun){ $_ | Out-File -FilePath $fav -Encoding utf8 -Force }
  }
    Add-Report "fs","create",$fav,"placeholder"
    Write-OK "Creado public/favicon.svg"
  } else { Write-Warn "public/favicon.svg ya existe" }
}

function Do-Runbook {
  Write-Step "Validaciones y Runbook Git"
  try{ if(-not $DryRun){ pnpm lint }; Add-Report "ci","lint","pnpm","done" } catch { Write-Warn "lint falló: $($_.Exception.Message)" }
  try{ if(-not $DryRun){ pnpm build }; Add-Report "ci","build","pnpm","done" } catch { Write-Warn "build falló: $($_.Exception.Message)" }
  $gitCmds = @"
git status
git add app/tokens.css app/fonts.ts app/layout.tsx app/globals.css public/favicon.svg
git commit -m ""chore(style,seo): tokens, fuentes, metadata y favicon""
git push
"@
  $runbook = Join-Path $RepoRoot "RUNBOOK_GIT.txt"
  if(-not $DryRun){ $gitCmds | Out-File -FilePath $runbook -Encoding utf8 -Force }
  Add-Report "doc","runbook",$runbook,"git commands"
  Write-OK "RUNBOOK_GIT.txt generado."
}

switch ($Mode) {
  'tokens'  { Do-Tokens }
  'fonts'   { Do-Fonts }
  'images'  { Do-Images }
  'seo'     { Do-SEO }
  'favicon' { Do-Favicon }
  'all'     { Do-Tokens; Do-Fonts; Do-Images; Do-SEO; Do-Favicon; Do-Runbook }
}

Write-OK "Hecho. Reporte: $Report"
if($DryRun){ Write-Warn "DryRun activo: no se han modificado archivos." }
