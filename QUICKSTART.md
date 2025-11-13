# 🚀 Guía de Inicio Rápido

## Requisitos

- **Node.js**: 18 o superior ([Descargar](https://nodejs.org/))
- **npm**: 9 o superior (incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)

## 1️⃣ Instalación Inicial

### Paso 1: Descargar/Clonar

```powershell
# Si tienes Git
git clone <url-del-repositorio>
cd Bloque2.1_Configuracion_Base

# O descarga el ZIP y extrae
cd Bloque2.1_Configuracion_Base
```

### Paso 2: Instalar Dependencias

```powershell
npm install
```

Esto instalará:
- Playwright (navegadores automatizados)
- Cucumber.js (BDD framework)
- TypeScript (lenguaje tipado)
- Y más...

### Paso 3: Instalar Navegadores

```powershell
npx playwright install
```

O con dependencias del sistema (Linux/Mac):
```powershell
npx playwright install --with-deps
```

### Paso 4: Crear Archivo `.env`

Copia el contenido de `.env.example` o crea `.env`:

```env
BASE_URL_UI=https://www.saucedemo.com
BASE_URL_API=https://dummyjson.com
USERNAME=standard_user
PASSWORD=secret_sauce
API_USERNAME=kminchelle
API_PASSWORD=0lelplR
HEADLESS=false
SLOW_MO=0
REPORT_DIR=./reports
SCREENSHOT_DIR=./reports/screenshots
```

## 2️⃣ Ejecutar Pruebas

### Pruebas E2E (Interfaz de Usuario)

```powershell
npm run test:e2e
```

**Qué ocurre:**
1. Se abre un navegador Chrome
2. Navega a https://www.saucedemo.com
3. Ejecuta los 3 escenarios de compra
4. Genera reportes en `reports/`

**Salida esperada:**
```
✓ Camino feliz - Compra exitosa
✓ Login fallido - Error detectado
✓ Carrito persistente - Validado
```

### Pruebas de API

```powershell
npm run test:api
```

**Qué ocurre:**
1. Se conecta a https://dummyjson.com
2. Prueba autenticación, usuarios, productos
3. Valida respuestas JSON
4. Genera reportes

**Salida esperada:**
```
✓ Autenticación exitosa
✓ Login fallido
✓ Listar usuarios
✓ Usuario específico
✓ Productos con paginación
```

### Todas las Pruebas

```powershell
npm run test:all
```

Ejecuta E2E + API secuencialmente.

## 3️⃣ Ver Resultados

### Reporte HTML

```powershell
# Abre automáticamente (Windows)
start reports/cucumber-report.html

# O manualmente: haz clic en reports/cucumber-report.html
```

### Reporte JSON

```powershell
# Abrir en editor
code reports/report.json
```

### Screenshots de Fallos

```powershell
# Ver carpeta
explorer reports/screenshots/
```

## 4️⃣ Ejecutar en Modo Depuración

### Con navegador visible

```powershell
$env:HEADLESS='false'; npm run test:e2e
```

O en PowerShell directamente:
```powershell
[Environment]::SetEnvironmentVariable('HEADLESS', 'false', 'Process'); npm run test:e2e
```

### Con pausas

Agrega `await page.pause();` en cualquier task o step para pausar la ejecución.

### Con ralentización

```env
SLOW_MO=1000  # 1 segundo entre cada acción
```

## 5️⃣ Solucionar Problemas

### "npm not found"

Instala Node.js desde https://nodejs.org/

### "cucumber-js not found"

```powershell
npm install
```

### "Playwright failed to install"

```powershell
npx playwright install --with-deps
```

### "URL not reachable"

```powershell
# Verifica conectividad
Test-NetConnection -ComputerName www.saucedemo.com -Port 443
```

Más en: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📋 Estructura de Carpetas Clave

```
├── .env                              ← Tu configuración (NO SUBIR)
├── tests/
│   ├── e2e/features/                ← Escenarios de UI (.feature)
│   │   └── compra_flujo_completo.feature
│   ├── e2e/steps/                   ← Steps para UI
│   │   └── compra_flujo_completo.steps.ts
│   ├── api/features/                ← Escenarios de API
│   │   └── dummyjson_api.feature
│   └── api/steps/                   ← Steps para API
│       └── dummyjson_api.steps.ts
├── src/
│   ├── screenplay/tasks/            ← Acciones (Login, Checkout, etc.)
│   ├── screenplay/questions/        ← Validaciones
│   ├── screenplay/abilities/        ← Habilidades (navegador, API)
│   └── config/environment.ts        ← Configuración centralizada
└── reports/                         ← Reportes generados
    ├── report.json
    ├── cucumber-report.html
    └── screenshots/
```

## 🎯 Escenarios Disponibles

### E2E (UI) - 3 escenarios

1. **Compra Exitosa** ✅
   - Login correcto
   - Agregar producto
   - Completar compra
   - Mensaje de confirmación

2. **Login Fallido** ❌
   - Credenciales inválidas
   - Mensaje de error visible

3. **Carrito Persistente** 🛒
   - Agregar producto
   - Logout
   - Login nuevamente
   - Carrito vacío

### API - 5 escenarios

1. **Autenticación Exitosa** ✅
2. **Autenticación Fallida** ❌
3. **Listar Usuarios** 👥
4. **Usuario Específico** 👤
5. **Productos** 📦

## 🔧 Personalizar

### Cambiar URL de Sauce Demo

En `.env`:
```env
BASE_URL_UI=https://www.saucedemo.com
```

Otros usuarios disponibles:
```env
USERNAME=locked_out_user        # Usuario bloqueado
USERNAME=problem_user           # Usuario con problemas de UI
USERNAME=performance_glitch_user # Usuario con retrasos
```

### Cambiar Credenciales API

En `.env`:
```env
API_USERNAME=kminchelle
API_PASSWORD=0lelplR
```

## 🔄 Pipeline CI/CD

El proyecto está listo para GitHub Actions. Cuando hagas push:

1. Las pruebas se ejecutan automáticamente
2. Se generan reportes
3. Se cargan como artefactos
4. Si hay error en un PR, recibiras un comentario

## 📚 Documentación Completa

- **README.md** - Visión general del proyecto
- **ARCHITECTURE.md** - Patrón Screenplay explicado
- **TROUBLESHOOTING.md** - Solución de problemas
- **QUICKSTART.md** - Este documento

## ✅ Checklist

- [ ] ¿Node.js instalado? (`node --version`)
- [ ] ¿Dependencias instaladas? (`npm install`)
- [ ] ¿Navegadores instalados? (`npx playwright install`)
- [ ] ¿Archivo `.env` creado?
- [ ] ¿Puedo ejecutar? (`npm run test:e2e`)
- [ ] ¿Ver reportes? (abre `reports/cucumber-report.html`)

## 🎉 ¡Listo!

Ejecuta tu primera prueba:

```powershell
npm run test:e2e
```

¡Deberías ver un navegador automatizado comprando en Sauce Demo! 🚀

---

**Para más ayuda:** Revisa [TROUBLESHOOTING.md](TROUBLESHOOTING.md) o [ARCHITECTURE.md](ARCHITECTURE.md)
