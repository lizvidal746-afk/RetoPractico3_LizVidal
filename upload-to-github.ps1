#!/usr/bin/env pwsh
# Script para subir los cambios al repositorio de GitHub

$repoUrl = "https://github.com/lizvidal746-afk/RetoPractico3_LizVidal.git"
$branch = "main"

Write-Host "🚀 Iniciando subida al repositorio..." -ForegroundColor Cyan
Write-Host "📍 Repositorio: $repoUrl" -ForegroundColor Green

# Verificar que estamos en el directorio correcto
$currentDir = Get-Location
Write-Host "📁 Directorio actual: $currentDir" -ForegroundColor Yellow

# Configurar Git globalmente
Write-Host "⚙️  Configurando Git..." -ForegroundColor Cyan
git config --global user.name "QA Automation" 2>&1
git config --global user.email "qa@automation.dev" 2>&1

# Verificar si es un repositorio Git
if (-Not (Test-Path ".git")) {
    Write-Host "📌 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    git remote add origin $repoUrl
} else {
    Write-Host "✅ Repositorio Git ya existe" -ForegroundColor Green
}

# Verificar estado del repositorio
Write-Host "`n📊 Estado actual del repositorio:" -ForegroundColor Cyan
git status

# Agregar todos los cambios
Write-Host "`n📝 Agregando cambios..." -ForegroundColor Cyan
git add -A

# Ver qué se va a commitear
Write-Host "`n📋 Cambios a commitear:" -ForegroundColor Yellow
git status --short

# Crear commit
$commitMessage = "feat: Implementación completa E2E + API + CI/CD - Patrón Screenplay"
Write-Host "`n💾 Creando commit: '$commitMessage'" -ForegroundColor Cyan
git commit -m $commitMessage

# Verificar que el commit se creó
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit creado exitosamente" -ForegroundColor Green
} else {
    Write-Host "⚠️  Posible error en commit (pero continuando)" -ForegroundColor Yellow
}

# Hacer push a GitHub
Write-Host "`n🔄 Haciendo push al repositorio remoto..." -ForegroundColor Cyan
git push -u origin $branch

# Verificar resultado
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ ¡Push completado exitosamente!" -ForegroundColor Green
    Write-Host "📊 Repositorio: $repoUrl" -ForegroundColor Green
    Write-Host "🌿 Rama: $branch" -ForegroundColor Green
} else {
    Write-Host "`n❌ Hubo un error durante el push" -ForegroundColor Red
    Write-Host "💡 Posibles soluciones:" -ForegroundColor Yellow
    Write-Host "  1. Verificar credenciales de GitHub"
    Write-Host "  2. Asegurar que la rama existe"
    Write-Host "  3. Intentar con token de autenticación"
}

Write-Host "`n✨ Script finalizado" -ForegroundColor Magenta
