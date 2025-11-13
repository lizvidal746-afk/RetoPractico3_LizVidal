#!/usr/bin/env pwsh
# Script para instalar dependencias e inicializar el proyecto

Write-Host "🔧 Instalando dependencias npm..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error durante npm install" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "  - npm run test:e2e    (ejecutar pruebas E2E)"
Write-Host "  - npm run test:api    (ejecutar pruebas API)"
Write-Host "  - npm run test:all    (ejecutar todas las pruebas)"
