# 📤 Instrucciones de Subida a GitHub

## Opción 1: Script Automático (Recomendado)

```powershell
# Ejecutar el script de subida
.\upload-to-github.ps1
```

**El script hará automáticamente:**
1. Configurar Git
2. Inicializar repositorio (si no existe)
3. Agregar todos los cambios
4. Crear commit con mensaje descriptivo
5. Hacer push a la rama `main`

---

## Opción 2: Comandos Manuales

### Paso 1: Configurar Git
```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
```

### Paso 2: Inicializar Repositorio (si es la primera vez)
```powershell
cd C:\Users\usitd04\Downloads\Bloque2.1_Configuracion_Base
git init
git remote add origin https://github.com/lizvidal746-afk/RetoPractico3_LizVidal.git
```

### Paso 3: Agregar Cambios
```powershell
git add -A
```

### Paso 4: Ver Cambios Pendientes
```powershell
git status
```

### Paso 5: Crear Commit
```powershell
git commit -m "feat: Implementación completa E2E + API + CI/CD - Patrón Screenplay"
```

### Paso 6: Hacer Push a GitHub
```powershell
git push -u origin main
```

**Si te pide autenticación:**
- Usuario: `lizvidal746-afk`
- Contraseña/Token: Tu contraseña de GitHub o un Personal Access Token

---

## Opción 3: GitHub Desktop

1. Abre GitHub Desktop
2. Archivo → Add Local Repository
3. Selecciona `C:\Users\usitd04\Downloads\Bloque2.1_Configuracion_Base`
4. Haz clic en "Publish repository"
5. Configura el repositorio destino

---

## ✅ Archivos que se Subirán

Todos los archivos creados/actualizados:

**Documentación:**
- ✅ README.md (actualizado)
- ✅ QUICKSTART.md
- ✅ ARCHITECTURE.md
- ✅ TROUBLESHOOTING.md
- ✅ IMPLEMENTATION_EVIDENCE.md

**Configuración:**
- ✅ package.json (actualizado)
- ✅ cucumber.js (actualizado)
- ✅ tsconfig.json
- ✅ .env (credenciales)
- ✅ .env.example
- ✅ .gitignore

**CI/CD:**
- ✅ .github/workflows/run-tests.yml

**Código Screenplay:**
- ✅ src/config/environment.ts (actualizado)
- ✅ src/screenplay/abilities/UseBrowser.ts
- ✅ src/screenplay/abilities/CallAPI.ts
- ✅ src/screenplay/actors/Actor.ts (actualizado)
- ✅ src/screenplay/actors/Cast.ts
- ✅ src/screenplay/tasks/ (5 archivos)
- ✅ src/screenplay/questions/ (4 archivos)
- ✅ src/support/hooks.ts (actualizado)
- ✅ src/support/world.ts (actualizado)

**Pruebas E2E:**
- ✅ tests/e2e/features/compra_flujo_completo.feature (actualizado)
- ✅ tests/e2e/steps/compra_flujo_completo.steps.ts (nuevo)
- ✅ tests/e2e/features/validacion_actor.feature (actualizado)

**Pruebas API:**
- ✅ tests/api/features/dummyjson_api.feature (actualizado)
- ✅ tests/api/steps/dummyjson_api.steps.ts (nuevo)

**Scripts:**
- ✅ setup.ps1 (actualizado)
- ✅ upload-to-github.ps1 (nuevo)

---

## 🔍 Verificar Antes de Subir

```powershell
# Ver estado actual
git status

# Ver cambios pendientes
git diff

# Ver commits locales no subidos
git log origin/main..HEAD

# Ver archivos no trackeados
git ls-files --others --exclude-standard
```

---

## 🚀 Después de la Subida

Verifica en GitHub:
1. Navega a https://github.com/lizvidal746-afk/RetoPractico3_LizVidal
2. Verifica que ves todos los archivos
3. Comprueba que el CI/CD se ejecuta (Actions)
4. Descarga los reportes si es necesario

---

## ⚠️ Notas Importantes

- **NO SUBIR:** carpeta `node_modules/`, `reports/`, `.env` (solo `.env.example`)
- **`.gitignore`** ya está configurado para excluir estos archivos
- Asegúrate de tener permisos en el repositorio
- Si usas 2FA en GitHub, necesitarás un Personal Access Token

---

## 🆘 Troubleshooting

### Error: "fatal: could not read Username"
**Solución:** Usa un Personal Access Token en lugar de contraseña

### Error: "Permission denied"
**Solución:** Verifica que tienes acceso al repositorio

### Error: "branch 'main' does not exist"
**Solución:** Cambia `main` por `master` o `develop` según corresponda

### Los cambios no aparecen en GitHub
**Solución:** Verifica que el push se completó: `git log --oneline -5`

---

**¡Todo listo para subir al repositorio!** 🚀
