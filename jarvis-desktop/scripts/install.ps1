$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Venv = Join-Path $Root ".venv"
$BundledPython = "C:\Users\mura0\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

if (Test-Path $BundledPython) {
    $Python = $BundledPython
} else {
    $Python = "py"
}

if (Test-Path $Venv) {
    Write-Host "Using existing virtual environment..."
} else {
    Write-Host "Creating virtual environment..."
    & $Python -m venv $Venv
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

$Pip = Join-Path $Venv "Scripts\pip.exe"
$PythonExe = Join-Path $Venv "Scripts\python.exe"

Write-Host "Upgrading pip..."
& $PythonExe -m pip install --upgrade pip
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Installing dependencies..."
& $Pip install -r (Join-Path $Root "requirements.txt")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Done. Run Jarvis with:"
Write-Host "  .\scripts\run.ps1"
