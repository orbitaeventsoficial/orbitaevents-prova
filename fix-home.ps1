param([switch]$DryRun)

$ErrorActionPreference = 'Stop'
function Info($m){ Write-Host "ℹ $m" -ForegroundColor DarkGray }
function Ok($m){ Write-Host "✔ $m" -ForegroundColor Green }
function Warn($m){ Write-Host "↪ $m" -ForegroundColor Yellow }
function Err($m){ Write-Host "✖ $m" -ForegroundColor Red }

# Root
function Get-ProjectRoot {
  try { $g = (git rev-parse --show-toplevel) 2>$null; if ($LASTEXITCODE -eq 0 -and $g){ return $g } } catch {}
  return (Get-Location).Path
}
$Root = Get-ProjectRoot
function Abs($p){ if([IO.Path]::IsPathRooted($p)){$p}else{ Join-Path $Root $p } }

function Backup($file){
  if (-not (Test-Path -LiteralPath $file)) { return }
  $ts = Get-Date -Format "yyyyMMdd_HHmmss"
  $bak = "$file._bak_$ts"
  Copy-Item -LiteralPath $file -Destination $bak -Force
  Warn "Backup: $bak"
}

function Write-Text($path,[string]$content){
  $abs = Abs $path
  $dir = [IO.Path]::GetDirectoryName($abs)
  if(-not (Test-Path -LiteralPath $dir)){ New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  [IO.File]::WriteAllText($abs,$content,(New-Object Text.UTF8Encoding $false))
  Ok "Escrit: $abs"
}

# Esborra duplicats dins app/
$dupes = Get-ChildItem -Recurse -LiteralPath (Abs 'app') -Include page.ts,page.jsx,page.js,index.ts,index.tsx,index.jsx -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch 'app\\page\.tsx$' }

if($dupes){
  Warn "S'han trobat fitxers duplicats que poden interferir:"
  $dupes | ForEach-Object { Write-Host " - $($_.FullName)" -ForegroundColor Yellow }
  foreach($d in $dupes){
    Backup $d.FullName
    Remove-Item $d.FullName -Force
    Ok "Eliminat duplicat: $($d.FullName)"
  }
}

# Reescriu la home vàlida
$page = Abs 'app/page.tsx'
$code = @"
export const metadata = {
  title: 'Òrbita Events',
  description: "DJ, so, llum i producció d'esdeveniments"
}

export default function Page() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-black text-white p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Òrbita Events</h1>
        <p className="text-lg opacity-80">
          DJ, so, llum i producció d’esdeveniments. <br />
          Explora: <a href="/serveis" className="underline">Serveis</a> ·{' '}
          <a href="/portfolio" className="underline">Portfolio</a> ·{' '}
          <a href="/sobre" className="underline">Sobre nosaltres</a> ·{' '}
          <a href="/contacte" className="underline">Contacte</a>
        </p>
      </div>
    </main>
  )
}
"@

if(Test-Path -LiteralPath $page){
  Backup $page
}
Write-Text $page $code

Ok "Home (app/page.tsx) recreada i duplicats eliminats. Ara: pnpm dev"
