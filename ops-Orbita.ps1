param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

function Info($m){ Write-Host "ℹ $m" -ForegroundColor DarkGray }
function Ok($m){ Write-Host "✔ $m" -ForegroundColor Green }
function Warn($m){ Write-Host "↪ $m" -ForegroundColor Yellow }
function Err($m){ Write-Host "✖ $m" -ForegroundColor Red }

function Abs($p){ if([IO.Path]::IsPathRooted($p)){$p}else{ Join-Path (Get-Location) $p } }

function Backup($file){
  if(Test-Path -LiteralPath $file){
    $bak = "$file._bak_$(Get-Date -Format yyyyMMdd_HHmmss)"
    if(-not $DryRun){ Copy-Item -LiteralPath $file -Destination $bak -Force }
    Warn "Backup: $bak"
  }
}

function ReadText($file){ if(Test-Path -LiteralPath $file){ Get-Content -LiteralPath $file -Raw } else { $null } }

function WriteText($path,[string]$content,[switch]$Force){
  $abs = Abs $path
  $dir = [IO.Path]::GetDirectoryName($abs)
  if(-not (Test-Path -LiteralPath $dir)){ New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if((Test-Path -LiteralPath $abs) -and -not $Force){ Info "Ja existeix: $path (no es toca)"; return }
  if(-not $DryRun){ [IO.File]::WriteAllText($abs,$content,(New-Object Text.UTF8Encoding $false)) }
  Ok "Escrit: $path"
}

function ReplaceInFileRegex($file,[string]$pattern,[string]$replacement){
  if(-not (Test-Path -LiteralPath $file)){ return $false }
  $txt = Get-Content -LiteralPath $file -Raw
  $rx  = [regex]::new($pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if(-not $rx.IsMatch($txt)){ Info "Sense canvis: $file"; return $false }
  $new = $rx.Replace($txt,$replacement)
  if($new -ne $txt){
    Backup $file
    if(-not $DryRun){ [IO.File]::WriteAllText($file,$new,(New-Object Text.UTF8Encoding $false)) }
    Ok "Actualitzat: $file"
    return $true
  } else { Info "Sense canvis: $file"; return $false }
}

# Limita el alcance de búsqueda a app/components/pages
$roots = @('app','components','pages') | Where-Object { Test-Path -LiteralPath $_ }
$files = @()
foreach($r in $roots){
  $files += Get-ChildItem -Path $r -Recurse -File -Filter *.tsx -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -notmatch '\\node_modules\\|\\\.next\\|\\\.git\\' }
  $files += Get-ChildItem -Path $r -Recurse -File -Filter *.jsx -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -notmatch '\\node_modules\\|\\\.next\\|\\\.git\\' }
}
if(-not $files){ Err "No s'han trobat fitxers TSX/JSX a app/components/pages"; exit 1 }
Info "Fitxers a processar: $($files.Count)"

# 1) Asegura que components/App.tsx sea Client Component
$appComp = "components/App.tsx"
if(Test-Path -LiteralPath $appComp){
  $code = Get-Content -LiteralPath $appComp -Raw
  if($code -notmatch '^\s*"use client"\s*;$' -and $code -notmatch '^\s*"use client"\s*$' -and $code -notmatch '^\s*\'use client\''){
    Backup $appComp
    $new = "'use client';`r`n" + $code
    if(-not $DryRun){ [IO.File]::WriteAllText($appComp,$new,(New-Object Text.UTF8Encoding $false)) }
    Ok "Afegit 'use client' a components/App.tsx"
  } else {
    Info "components/App.tsx ja és Client Component"
  }
}

# 2) Home: localizar app/page.tsx
$homeCandidates = @(
  "app/page.tsx",
  "app/page.jsx"
) | Where-Object { Test-Path -LiteralPath $_ }
if(-not $homeCandidates){ Err "No s'ha trobat app/page.tsx"; exit 1 }
$home = $homeCandidates[0]
$homeCode = Get-Content -LiteralPath $home -Raw

# 2a) Extraer secciones por anchor id
function ExtractInnerById([string]$tsx,[string]$idPattern){
  if([string]::IsNullOrWhiteSpace($tsx)){ return $null }
  # Captura <section ... id="algo" ...> ... </section>
  $rx = [regex]::new("<section[^>]*\bid\s*=\s*['""]($idPattern)['""][^>]*>(.*?)</section>",
    [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  $m = $rx.Match($tsx)
  if($m.Success){ return $m.Groups[2].Value.Trim() } else { return $null }
}

$packsHtml    = ExtractInnerById $homeCode 'packs'
$contactHtml  = ExtractInnerById $homeCode 'contact(e|o)'

# 2b) Crear/actualizar /serveis y /contacte con esas secciones
function BuildPageTsx([string]$title,[string]$subtitle,[string]$innerHtml){
@"
import Section from '@/components/Section'
import { CTA } from '@/components/CTA'

export const metadata = {
  title: '$title — Òrbita Events',
  description: '$subtitle'
}

export default function Page(){
  return (
    <Section title="$title" subtitle="$subtitle">
      <div className="prose max-w-none">
        ${(if([string]::IsNullOrWhiteSpace($innerHtml)){'<p className="opacity-80">Contingut provisional. Ajustarem text real.</p>'} else {$innerHtml})}
      </div>
      <CTA />
    </Section>
  )
}
"@
}

# Decide destino evitando rutas duplicadas (preferimos /app/serveis sobre /(marketing)/serveis)
function PreferredPath([string]$slug){
  $direct = "app/$slug/page.tsx"
  $group  = "app/(marketing)/$slug/page.tsx"
  if(Test-Path -LiteralPath $direct){ return $direct }
  elseif(Test-Path -LiteralPath $group){ return $group }
  else { return $direct } # crear directo
}

$serveisPath  = PreferredPath 'serveis'
$contactePath = PreferredPath 'contacte'

if($packsHtml){
  $code = BuildPageTsx 'Serveis' 'DJ, so, llum, efectes i producció.' $packsHtml
  if(Test-Path -LiteralPath $serveisPath){ Info "$serveisPath ja existeix (no es toca)"; }
  else { WriteText $serveisPath $code }
} else {
  Warn "No s'ha trobat #packs a la home; /serveis sortirà amb placeholder si no existeix."
  if(-not (Test-Path -LiteralPath $serveisPath)){
    WriteText $serveisPath (BuildPageTsx 'Serveis' 'DJ, so, llum, efectes i producció.' $null)
  }
}

if($contactHtml){
  $code = BuildPageTsx 'Contacte' 'Responem ràpid si tens data i lloc.' $contactHtml
  if(Test-Path -LiteralPath $contactePath){ Info "$contactePath ja existeix (no es toca)"; }
  else { WriteText $contactePath $code }
} else {
  Warn "No s'ha trobat #contacte/#contacto a la home; /contacte sortirà amb placeholder si no existeix."
  if(-not (Test-Path -LiteralPath $contactePath)){
    WriteText $contactePath (BuildPageTsx 'Contacte' 'Responem ràpid si tens data i lloc.' $null)
  }
}

# 3) Sustituir anchors por rutas reales en project-wide, excepto #opinions que se queda
$anchorMap = @(
  @{ pattern = '(?i)href\s*=\s*"#serveis"';    replace='href="/serveis"'   },
  @{ pattern = '(?i)href\s*=\s*"#packs"';      replace='href="/serveis"'   },
  @{ pattern = '(?i)href\s*=\s*"#portfolio"';  replace='href="/portfolio"' },
  @{ pattern = '(?i)href\s*=\s*"#contacte"';   replace='href="/contacte"'  },
  @{ pattern = '(?i)href\s*=\s*"#contacto"';   replace='href="/contacte"'  },
  @{ pattern = '(?i)href\s*=\s*"#sobre"';      replace='href="/sobre"'     },
  @{ pattern = '(?i)href\s*=\s*"#nosaltres"';  replace='href="/sobre"'     },
  @{ pattern = '(?i)href\s*=\s*"#sobre-nosotros"'; replace='href="/sobre"'}
)
foreach($f in $files){
  foreach($r in $anchorMap){
    # No tocamos #opinions
    if($r.pattern -match 'opinions'){ continue }
    ReplaceInFileRegex $f $r.pattern $r.replace | Out-Null
  }
}

# 4) Asegura que el “botón planeta” de Home está presente en todas (si existe Header/menú común, no tocamos)
# Aquí solo avisamos; no forcemos cambios agresivos
if(Test-Path -LiteralPath "components/Header.tsx"){
  Info "Revisa que el planet button esté en components/Header.tsx para heredar en todas las páginas."
} else {
  Info "No hi ha components/Header.tsx detectat. Si vols el 'planeta' global, centralízalo en un Header comú."
}

# 5) Limpia cache de Next para evitar fantasmas
if(Test-Path -LiteralPath ".next"){ Remove-Item ".next" -Recurse -Force; Ok "Cache .next esborrada" }

Ok "Split completat: /serveis i /contacte creats si cal, anchors substituïts (excepte #opinions). Executa: pnpm dev"
