param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

function Info($m){ Write-Host "ℹ $m" -ForegroundColor DarkGray }
function Ok($m){ Write-Host "✔ $m" -ForegroundColor Green }
function Warn($m){ Write-Host "↪ $m" -ForegroundColor Yellow }
function Err($m){ Write-Host "✖ $m" -ForegroundColor Red }

# --- Helpers -----------------------------------------------------
function Abs($p){ if([IO.Path]::IsPathRooted($p)){$p}else{ Join-Path (Get-Location) $p } }

function Backup($file){
  if(Test-Path -LiteralPath $file){
    $bak = "$file._bak_$(Get-Date -Format yyyyMMdd_HHmmss)"
    if(-not $DryRun){ Copy-Item -LiteralPath $file -Destination $bak -Force }
    Warn "Backup: $bak"
  }
}

function Write-Text($path,[string]$content){
  $abs = Abs $path
  $dir = [IO.Path]::GetDirectoryName($abs)
  if(-not (Test-Path -LiteralPath $dir)){ New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if(-not $DryRun){ [IO.File]::WriteAllText($abs,$content,(New-Object Text.UTF8Encoding $false)) }
  Ok "Escrit: $abs"
}

function Replace-Regex-InFile($file,[string]$pattern,[string]$replacement){
  if(-not (Test-Path -LiteralPath $file)){ return $false }
  $txt = Get-Content -LiteralPath $file -Raw
  $new = [regex]::Replace($txt,$pattern,$replacement,[System.Text.RegularExpressions.RegexOptions]::Singleline)
  if($new -ne $txt){
    Backup $file
    if(-not $DryRun){ [IO.File]::WriteAllText($file,$new,(New-Object Text.UTF8Encoding $false)) }
    Ok "Actualitzat: $file"
    return $true
  } else { Info "Sense canvis: $file"; return $false }
}

# Troba el landing font: si app/page.tsx només fa <App/>, treballem sobre components/App.tsx
$appPage = "app/page.tsx"
$appComp = "components/App.tsx"
$sourceForSections = $null

if(Test-Path -LiteralPath $appComp){
  $sourceForSections = $appComp
  Info "Faré l'extracció des de $appComp"
} elseif(Test-Path -LiteralPath $appPage) {
  $sourceForSections = $appPage
  Info "Faré l'extracció des de $appPage"
} else {
  Err "No trobo ni components/App.tsx ni app/page.tsx. Plego."
  exit 1
}

# --- Extracció tolerant per id/sinònims --------------------------
function Extract-Section([string]$file,[string[]]$idOptions){
  if(-not (Test-Path -LiteralPath $file)){ return $null }
  $txt = Get-Content -LiteralPath $file -Raw
  foreach($id in $idOptions){
    $rx = "(?is)<section[^>]*\bid\s*=\s*['""]$id['""][^>]*>(.*?)</section>"
    $m = [regex]::Match($txt,$rx)
    if($m.Success){ return @{ html=$m.Groups[1].Value.Trim(); full=$m.Value } }
  }
  return $null
}

function Remove-Section([string]$file,[string]$fullMarkup){
  if([string]::IsNullOrWhiteSpace($fullMarkup)){ return }
  Replace-Regex-InFile $file ([regex]::Escape($fullMarkup)) ""
}

# --- 1) Traça i talla seccions del landing ----------------------
$packsSec     = Extract-Section $sourceForSections @('packs','pack','precios','tarifas')
$contactSec   = Extract-Section $sourceForSections @('contacte','contacto','contact')
$servicesSec  = Extract-Section $sourceForSections @('serveis','servicios','services')
$faqSec       = Extract-Section $sourceForSections @('faq','preguntas','preguntes')

if($packsSec){ Ok "Packs detectats per tallar" } else { Warn "No s'ha trobat section de Packs (id='packs'). Crearé placeholder a /serveis." }
if($contactSec){ Ok "Contacte detectat per tallar" } else { Warn "No s'ha trobat section de Contacte (id='contacte'). Crearé placeholder a /contacte." }
if($servicesSec){ Ok "Serveis detectats (font per /serveis)" } else { Warn "No s'ha trobat section de Serveis (id='serveis')." }
if($faqSec){ Info "FAQ detectada (la posaré a /serveis si existeix)" }

# --- 2) Elimina del Home: packs i contacte ----------------------
if($packsSec){ Remove-Section $sourceForSections $packsSec.full }
if($contactSec){ Remove-Section $sourceForSections $contactSec.full }

# --- 3) Crea/actualitza /serveis i /contacte --------------------
$serveisPath = "app/serveis/page.tsx"
$contactePath = "app/contacte/page.tsx"

$servicesHtml = if($servicesSec){ $servicesSec.html } else { '<p className="opacity-80">Serveis: contingut provisional.</p>' }
$packsHtml    = if($packsSec){ $packsSec.html } else { '<p className="opacity-80">Packs: contingut provisional.</p>' }
$faqHtml      = if($faqSec){ $faqSec.html } else { '' }
$contactHtml  = if($contactSec){ $contactSec.html } else { '<p className="opacity-80">Contacte: formulari i dades provisionals.</p>' }

$serveisCode = @"
import Section from '@/components/Section'
import './globals.css'

export const metadata = {
  title: 'Serveis — Òrbita Events',
  description: 'DJ, so, llum i producció per a bodes, empresa i festes',
}

export default function Page(){
  return (
    <main className="container mx-auto px-4">
      <Section title="Serveis" subtitle="DJ, tècnica, llum i animació">
        <div className="prose max-w-none">
          $servicesHtml
        </div>
      </Section>

      <Section title="Packs" subtitle="Opcions clares amb tot inclòs">
        <div className="prose max-w-none">
          $packsHtml
        </div>
      </Section>

      ${(if($faqHtml){ @"
      <Section title="Preguntes freqüents" subtitle="Respostes ràpides">
        <div className="prose max-w-none">
          $faqHtml
        </div>
      </Section>
"@ } else { "" })}
    </main>
  )
}
"@

Write-Text $serveisPath $serveisCode

$contacteCode = @"
import Section from '@/components/Section'
import './globals.css'

export const metadata = {
  title: 'Contacte — Òrbita Events',
  description: 'Demana disponibilitat i pressupost ràpid',
}

export default function Page(){
  return (
    <main className="container mx-auto px-4">
      <Section title="Contacte" subtitle="Respondrem de seguida si tens data i lloc">
        <div className="prose max-w-none">
          $contactHtml
        </div>
      </Section>
    </main>
  )
}
"@

Write-Text $contactePath $contacteCode

# --- 4) Neteja duplicats de rutes en (marketing) ----------------
$dup = "app/(marketing)/serveis/page.tsx"
if(Test-Path -LiteralPath $dup){
  Warn "Hi ha una ruta duplicada: (marketing)/serveis. L'eliminaré per evitar conflicte."
  Backup $dup
  if(-not $DryRun){ Remove-Item -LiteralPath $dup -Force }
  Ok "Eliminat: $dup"
}

# --- 5) Reescriptura d’enllaços: # -> rutes reals ----------------
$allTsx = Get-ChildItem -Recurse -Include *.tsx -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
$reps = @(
  @{ p='(?i)href\s*=\s*["'']#packs["'']';       r='href="/serveis#packs"' },
  @{ p='(?i)href\s*=\s*["'']#pack["'']';        r='href="/serveis#packs"' },
  @{ p='(?i)href\s*=\s*["'']#serveis["'']';     r='href="/serveis"' },
  @{ p='(?i)href\s*=\s*["'']#servicios["'']';   r='href="/serveis"' },
  @{ p='(?i)href\s*=\s*["'']#portfolio["'']';   r='href="/portfolio"' },
  @{ p='(?i)href\s*=\s*["'']#contacte["'']';    r='href="/contacte"' },
  @{ p='(?i)href\s*=\s*["'']#contacto["'']';    r='href="/contacte"' }
)

foreach($f in $allTsx){
  foreach($r in $reps){ Replace-Regex-InFile $f $r.p $r.r | Out-Null }
}

# --- 6) Botó Home/planeta al Header ------------------------------
$headerFileCandidates = @(
  "components/Header.tsx",
  "app/components/Header.tsx",
  "components/ui/Header.tsx",
  "components/AppHeader.tsx"
) | Where-Object { Test-Path -LiteralPath $_ }

foreach($hf in $headerFileCandidates){
  $txt = Get-Content -LiteralPath $hf -Raw
  if($txt -notmatch 'href=.?["'']/["'']'){
    Backup $hf
    $pat = '(?is)<nav[^>]*>(.*?)</nav>'
    if([regex]::IsMatch($txt,$pat)){
      $new = [regex]::Replace($txt,$pat,{
        param($m)
        $inner = $m.Groups[1].Value
        $btn = '<a href="/" className="inline-flex items-center gap-2 px-3 py-1 rounded hover:opacity-80"><span aria-hidden="true">🌐</span><span className="sr-only">Home</span></a>'
        return "<nav>" + $btn + $inner + "</nav>"
      })
      if(-not $DryRun){ [IO.File]::WriteAllText($hf,$new,(New-Object Text.UTF8Encoding $false)) }
      Ok "Afegit botó Home a $hf"
    } else {
      Warn "No puc trobar <nav> a $hf. Salto."
    }
  } else {
    Info "Header ja té enllaç a / : $hf"
  }
}

# --- 7) Recordatori cache ---------------------------------------
if(Test-Path -LiteralPath ".next"){ Remove-Item ".next" -Recurse -Force; Ok ".next esborrat" }

Ok "Migració feta: Home sanejat, /serveis i /contacte creats/omplerts i enllaços arreglats. Executa: pnpm dev"
