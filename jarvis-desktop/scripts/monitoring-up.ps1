$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

docker compose -f .\docker-compose.monitoring.yml up -d

Write-Host ""
Write-Host "Grafana:    http://localhost:3001"
Write-Host "Login:      admin / jarvis"
Write-Host "Prometheus: http://localhost:9090"
Write-Host "Jarvis metrics should be visible at: http://127.0.0.1:8765/metrics"
