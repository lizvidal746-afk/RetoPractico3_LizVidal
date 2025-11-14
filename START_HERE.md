# 🎯 INSTRUCCIONES FINALES - INSTALACIÓN Y EJECUCIÓN

## ⚠️ SITUACIÓN ACTUAL

El error que ves es normal:
```
"cucumber-js" no se reconoce como un comando interno o externo
```

**Razón:** Las dependencias npm NO están instaladas aún.

---

## ✅ SOLUCIÓN EN 3 PASOS

### PASO 1️⃣: Abrir PowerShell

```powershell
# Abre PowerShell como Administrador
# Presiona: Win + X → PowerShell (Admin)

# O en CMD, navega a:
cd C:\Users\usitd04\Downloads\Bloque2.1_Configuracion_Base
```

### PASO 2️⃣: Ejecutar Script de Instalación

**Opción A - Script PowerShell (Recomendado):**
```powershell
.\setup.ps1
```

**Opción B - Archivo Batch:**
```cmd
install.bat
```

**Opción C - Manual:**
```powershell
npm install
npx playwright install --with-deps
```

### PASO 3️⃣: Ejecutar Pruebas

Una vez que termine la instalación:

```powershell
# Pruebas E2E
npm run test:e2e

# Pruebas API
npm run test:api

# Todas las pruebas
npm run test:all
```

---

## 📊 QUÉ PASARÁ CUANDO EJECUTES

### `npm run test:e2e`

1. Se abre un navegador Chrome
2. Navega a https://www.saucedemo.com
3. Ejecuta 3 escenarios:
   - ✅ Compra exitosa (login → producto → checkout)
   - ❌ Login fallido (credenciales inválidas)
   - 🛒 Carrito persistente (logout → login → validación)
4. Se generan reportes en `reports/`

**Duración:** 30-60 segundos

### `npm run test:api`

1. Se conecta a https://dummyjson.com
2. Ejecuta 5 escenarios:
   - ✅ Autenticación exitosa
   - ❌ Autenticación fallida
   - 👥 Listar usuarios
   - 👤 Usuario específico
   - 📦 Productos
3. Se generan reportes

**Duración:** 5-10 segundos

---

## 📈 RESULTADOS ESPERADOS

### Instalación Exitosa

```
added 123 packages, and audited 456 packages in 12.34s
✅ Dependencias instaladas
✅ Navegadores instalados
```

### Ejecución Exitosa

```
3 scenarios (3 passed)
11 steps (11 passed)
30.567s

5 scenarios (5 passed)
25 steps (25 passed)
8.234s
```

---

## 📋 VER RESULTADOS

### Reporte HTML (Mejor opción)

```powershell
start reports/cucumber-report.html
```

Abre en navegador con visualización clara de:
- Escenarios ejecutados
- Pasos pasados/fallidos
- Tiempos
- Screenshots de fallos (si hay)

### Reporte JSON

```powershell
code reports/report.json
```

---

## 🔍 PASO A PASO (Desde 0)

```powershell
# 1. Abrir PowerShell (Win + X)
# 2. Navegar al proyecto
cd C:\Users\usitd04\Downloads\Bloque2.1_Configuracion_Base

# 3. Verificar Node.js
node --version  # Debe mostrar v18+
npm --version   # Debe mostrar 9+

# 4. Instalar dependencias
npm install

# 5. Instalar navegadores
npx playwright install --with-deps

# 6. Ejecutar pruebas E2E
npm run test:e2e

# 7. Ejecutar pruebas API
npm run test:api

# 8. Ver reportes
start reports/cucumber-report.html
```

---

## ⚡ OPCIÓN RÁPIDA (Script)

**Solo ejecuta esto en PowerShell:**

```powershell
cd C:\Users\usitd04\Downloads\Bloque2.1_Configuracion_Base
.\setup.ps1
```

El script hace todo automáticamente:
- ✅ Verifica Node.js
- ✅ npm install
- ✅ playwright install
- ✅ Verifica .env
- ✅ Muestra próximos pasos

---

## 🎓 DESPUÉS DE INSTALAR

| Comando | Descripción |
|---------|------------|
| `npm run test:e2e` | Pruebas E2E (UI) |
| `npm run test:api` | Pruebas API |
| `npm run test:all` | Todas las pruebas |
| `start reports/cucumber-report.html` | Ver reportes |

---

## 🐛 SI HAY PROBLEMAS

### Problema: "npm not found"
```
Solución: Instala Node.js desde https://nodejs.org/
```

### Problema: "Permission denied"
```
Solución: Abre PowerShell como Administrador
```

### Problema: "Playwright install falla"
```
Solución: 
npm uninstall playwright
npm install --save-dev playwright
npx playwright install --with-deps
```

---

## 📚 DOCUMENTACIÓN ADICIONAL

Si tienes problemas, consulta:

- **INSTALLATION.md** - Instalación detallada
- **QUICKSTART.md** - Guía rápida
- **TROUBLESHOOTING.md** - Solución de problemas
- **README.md** - Documentación completa

---

## ✅ CHECKLIST FINAL

Antes de ejecutar pruebas:

- [ ] Node.js 18+ instalado
- [ ] npm 9+ instalado
- [ ] `npm install` completado sin errores
- [ ] `npx playwright install` completado
- [ ] Archivo `.env` existe
- [ ] Puedo ver carpeta `node_modules/` creada
- [ ] Puedo ver carpeta `src/screenplay/` con archivos TS
- [ ] Conexión a internet funcionando

---

## 🚀 ¡LISTO!

**Ejecuta:**
```powershell
npm run test:e2e
```

**Deberías ver un navegador abrirse y ejecutar pruebas automáticamente.**

---

**Cualquier duda, consulta los archivos MD de documentación.** ✨
