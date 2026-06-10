$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$VenvPython = Join-Path $Root ".venv\Scripts\python.exe"
$BundledPython = "C:\Users\mura0\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

Set-Location $Root

if (Test-Path $VenvPython) {
    & $VenvPython -m jarvis
} elseif (Test-Path $BundledPython) {
    & $BundledPython -m jarvis
} else {
    py -m jarvis
}
