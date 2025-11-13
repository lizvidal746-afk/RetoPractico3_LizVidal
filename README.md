# 🎯 Automatización E2E + API Integrada con CI/CD

Suite de pruebas automatizadas que combina:
- ✅ Pruebas E2E (UI) sobre [Sauce Demo](https://www.saucedemo.com)
- ✅ Pruebas de API usando [DummyJSON](https://dummyjson.com/docs)
- ✅ Pipeline CI/CD funcional en GitHub Actions

---

## 🛠️ Tecnologías

| Herramienta | Versión | Propósito |
|---|---|---|
| **Node.js** | 18+ | Runtime de JavaScript |
| **TypeScript** | 5.3.3 | Lenguaje de programación tipado |
| **Playwright** | 1.40.1 | Automatización de navegadores |
| **Cucumber.js** | 9.5.1 | Framework BDD |
| **dotenv** | 16.3.1 | Gestión de variables de entorno |
| **GitHub Actions** | - | CI/CD |

---

## 🚀 Quick Start

### Instalación

```powershell
npm install
npx playwright install
```

### Ejecutar Pruebas

```powershell
npm run test:e2e    # Pruebas E2E (UI)
npm run test:api    # Pruebas API
npm run test:all    # Todas las pruebas
```

### Resultados

Los reportes se generan en:
- `reports/cucumber-report.html` - Reporte visual
- `reports/report.json` - Datos en JSON
- `reports/screenshots/` - Capturas de fallos

---

## 📋 Escenarios Cubiertos

### E2E - Sauce Demo (3 escenarios)

✅ **Camino Feliz**: Login → Agregar Producto → Checkout → Confirmación  
❌ **Login Fallido**: Credenciales inválidas → Error  
🛒 **Carrito Persistente**: Logout → Login → Carrito vacío

### API - DummyJSON (5 escenarios)

✅ **Auth Exitosa**: POST /auth/login → Token + Status 200  
❌ **Auth Fallida**: Credenciales inválidas → Status 400/401  
👥 **Listar Usuarios**: GET /users con token → Array  
👤 **Usuario Específico**: GET /users/{id} → Datos  
📦 **Productos**: GET /products → Array con precio/stock

---

## 🏗️ Patrón Screenplay

Arquitectura modular basada en actores y tareas:

```
Actor
 ├─ Abilities (UseBrowser, CallAPI)
 ├─ Tasks (LoginWithValidCredentials, Checkout, etc.)
 └─ Questions (IsLoggedIn, ErrorMessage, CartItems)
```

Cada tarea y pregunta es **reutilizable** en múltiples escenarios.

---

## ⚙️ Configuración

### Archivo `.env`

```env
BASE_URL_UI=https://www.saucedemo.com
BASE_URL_API=https://dummyjson.com
USERNAME=standard_user
PASSWORD=secret_sauce
API_USERNAME=kminchelle
API_PASSWORD=0lelplR
HEADLESS=false
```

---

## 🔄 Pipeline CI/CD

**Triggers**: Push/PR a `main`, `master`  
**Jobs**: npm install → test E2E → test API → reportes → artefactos

Archivo: `.github/workflows/run-tests.yml`

---

## 📚 Documentación Completa

### Estructura del Proyecto

```
src/
├── config/environment.ts          # Variables centralizadas
├── screenplay/
│   ├── abilities/                 # Habilidades (UseBrowser, CallAPI)
│   ├── actors/                    # Actores (Actor, Cast)
│   ├── tasks/                     # Acciones (Login, Checkout, etc.)
│   └── questions/                 # Validaciones (IsLoggedIn, etc.)
└── support/                       # Hooks y World
tests/
├── e2e/features/                  # Escenarios .feature (E2E)
├── e2e/steps/                     # Step definitions
└── api/                           # Escenarios y steps de API
```

### Pasos para Agregar Nuevos Escenarios

1. Crear archivo `.feature` en `tests/e2e/features/` o `tests/api/features/`
2. Escribir escenarios en Gherkin
3. Implementar steps en `tests/e2e/steps/` o `tests/api/steps/`
4. Reutilizar Tasks y Questions existentes
5. Ejecutar: `npm run test:e2e` o `npm run test:api`

### Credenciales de Prueba

| Sistema | Usuario | Contraseña |
|---------|---------|------------|
| Sauce Demo | `standard_user` | `secret_sauce` |
| DummyJSON | `kminchelle` | `0lelplR` |

---

## 🔐 Variables de Entorno

| Variable | Valor por Defecto | Descripción |
|----------|-------------------|-------------|
| `BASE_URL_UI` | https://www.saucedemo.com | URL de Sauce Demo |
| `BASE_URL_API` | https://dummyjson.com | URL de DummyJSON |
| `USERNAME` | standard_user | Usuario UI |
| `PASSWORD` | secret_sauce | Contraseña UI |
| `API_USERNAME` | kminchelle | Usuario API |
| `API_PASSWORD` | 0lelplR | Contraseña API |
| `HEADLESS` | false | Modo navegador |
| `SLOW_MO` | 0 | Ralentizar navegador (ms) |

---

## 📊 Reportes

### Cucumber Report (`reports/cucumber-report.html`)

Incluye:
- Resumen de escenarios (pasados/fallidos)
- Detalle de cada paso
- Tiempos de ejecución
- Screenshots de fallos (si existen)

### JSON Report (`reports/report.json`)

Formato estándar para integración con otras herramientas.

### Screenshots (`reports/screenshots/`)

Se capturan automáticamente en fallos con timestamp.

---

## 🐛 Troubleshooting

### "cucumber-js no se reconoce"
```powershell
npm install
```

### Playwright no encuentra navegadores
```powershell
npx playwright install --with-deps
```

### Tests fallan por timeout
Aumentar timeout en steps o en `cucumber.js`

### Variables .env no se cargan
Verificar que `.env` esté en la raíz del proyecto

---

## 🎓 Mejores Prácticas Implementadas

✅ **Patrón Screenplay**: Separación clara de capas  
✅ **BDD con Gherkin**: Escenarios en español  
✅ **TypeScript**: Código tipado y seguro  
✅ **Configuración Centralizada**: Variables de entorno  
✅ **CI/CD Automático**: GitHub Actions  
✅ **Reportes Detallados**: HTML, JSON, screenshots  
✅ **Reutilización**: Tasks y Questions compartidas  
✅ **Error Handling**: Screenshots en fallos  

---

## 📚 Referencias

- [Playwright Docs](https://playwright.dev)
- [Cucumber.js](https://cucumber.io/docs/cucumber/)
- [Patrón Screenplay](https://serenity-bdd.info/docs/guide/principles.html)
- [GitHub Actions](https://docs.github.com/en/actions)
- [DummyJSON API](https://dummyjson.com/docs)

---

## 📄 Licencia

Proyecto educativo. Uso libre con referencia.

---

**Estado**: ✅ Producción | **Versión**: 1.0.0 | **Actualizado**: Noviembre 13, 2025


## 📖 Descripción

Este proyecto implementa una suite de automatización completa que incluye:

- **Pruebas E2E (UI)**: Automatización sobre https://www.saucedemo.com
- **Pruebas API**: Testing de endpoints en https://dummyjson.com
- **Patrón Screenplay**: Arquitectura modular y reutilizable
- **BDD con Cucumber**: Escenarios en formato Gherkin (español)
- **CI/CD con GitHub Actions**: Pipeline automático en cada push/PR

## 🏗️ Arquitectura

El proyecto sigue el **Patrón Screenplay** con separación clara de responsabilidades:

```
src/
├── config/              # Configuración y variables de entorno
├── screenplay/
│   ├── abilities/       # Habilidades de los actores (UseBrowser, CallAPI)
│   ├── actors/          # Definición de actores (Actor, Cast)
│   ├── tasks/           # Acciones de usuario (Login, Checkout, etc.)
│   ├── interactions/    # Interacciones con elementos UI
│   └── questions/       # Validaciones y aserciones (IsLoggedIn, ErrorMessage)
├── support/             # Hooks de Cucumber, World
└── api/                 # Utilidades para pruebas API

tests/
├── e2e/
│   ├── features/        # Archivos .feature con escenarios
│   └── steps/           # Step definitions (Gherkin → TypeScript)
└── api/
    ├── features/        # Escenarios de API
    └── steps/           # Steps para pruebas API
```

## 📋 Requisitos

- **Node.js**: >= 18.x
- **npm**: >= 9.x
- **TypeScript**: >= 5.x
- **Playwright**: >= 1.40.x
- **Cucumber**: >= 9.x

## 🔧 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <tu-repo>
   cd <directorio-proyecto>
   ```

2. **Instalar dependencias**:
   ```bash
   npm ci
   ```

3. **Instalar navegadores de Playwright**:
   ```bash
   npx playwright install
   ```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# URLs
BASE_URL_UI=https://www.saucedemo.com
BASE_URL_API=https://dummyjson.com

# Credenciales UI
USERNAME=standard_user
PASSWORD=secret_sauce

# Credenciales API
API_USERNAME=kminchelle
API_PASSWORD=0lelplR

# Configuración del navegador
HEADLESS=false
SLOW_MO=0

# Reportes
REPORT_DIR=./reports
SCREENSHOT_DIR=./reports/screenshots
```

**Nota**: Utiliza `.env.example` como referencia.

## 🚀 Ejecución de Pruebas

### Local

**Ejecutar pruebas E2E**:
```bash
npm run test:e2e
```

**Ejecutar pruebas API**:
```bash
npm run test:api
```

**Ejecutar todas las pruebas**:
```bash
npm run test:all
```

### En modo headless (CI/CD):
```bash
HEADLESS=true npm run test:all
```

### Con reportes Allure:
```bash
npm run allure:generate
npm run allure:open
```

## 🎯 Escenarios Cubiertos

### E2E Tests (SauceDemo)

1. **Camino feliz - Compra exitosa** ✅
   - Login válido
   - Seleccionar producto
   - Agregar al carrito
   - Completar checkout
   - Validar confirmación

2. **Validación negativa - Login fallido** ❌
   - Intento con credenciales inválidas
   - Validar mensaje de error

3. **Validación de carrito persistente** 🛒
   - Agregar producto al carrito
   - Logout
   - Login nuevamente
   - Verificar carrito vacío

### API Tests (DummyJSON)

1. **Autenticación exitosa** ✅
   - POST /auth/login con credenciales válidas
   - Validar token y status 200

2. **Fallo de autenticación** ❌
   - POST /auth/login con credenciales inválidas
   - Validar status 400/401 y error

3. **Flujo autenticado**
   - GET /users → listar usuarios
   - GET /users/{id} → usuario específico
   - Validar estructura JSON

4. **Productos** 📦
   - GET /products con paginación
   - Validar precio y stock

## 🔄 Pipeline CI/CD

### GitHub Actions Workflow

**Archivo**: `.github/workflows/run-tests.yml`

**Triggers**:
- Push a `main`, `master`, `develop`
- Pull Requests hacia esas ramas
- Ejecución manual (`workflow_dispatch`)

**Jobs**:
1. ✅ Checkout del código
2. 📦 Setup de Node.js
3. 📥 Instalar dependencias
4. 🎭 Instalar navegadores de Playwright
5. 🧪 Ejecutar pruebas E2E
6. 🌐 Ejecutar pruebas API
7. 📊 Generar reportes HTML
8. 📤 Subir artefactos
9. 💬 Comentar resultados en PR

### Artefactos Generados

- `reports/` - Reportes JSON y HTML
- `failure-screenshots/` - Capturas de fallos
- Disponibles durante 30 días

## 📁 Estructura del Proyecto

```
.
├── .env                           # Variables de entorno (NO commitear)
├── .env.example                   # Template de .env
├── .github/
│   └── workflows/
│       └── run-tests.yml          # Pipeline CI/CD
├── package.json                   # Dependencias
├── tsconfig.json                  # Configuración TypeScript
├── cucumber.js                    # Configuración Cucumber
├── src/
│   ├── config/
│   │   └── environment.ts         # Variables centralizadas
│   └── screenplay/
│       ├── abilities/
│       │   ├── UseBrowser.ts      # Habilidad para navegar
│       │   └── CallAPI.ts         # Habilidad para APIs
│       ├── actors/
│       │   ├── Actor.ts           # Clase Actor
│       │   └── Cast.ts            # Factory de actores
│       ├── tasks/
│       │   ├── LoginWithValidCredentials.ts
│       │   ├── LoginWithInvalidCredentials.ts
│       │   ├── AddProductToCart.ts
│       │   ├── Checkout.ts
│       │   └── Logout.ts
│       ├── questions/
│       │   ├── IsLoggedIn.ts
│       │   ├── ErrorMessage.ts
│       │   ├── CartItems.ts
│       │   └── CheckoutCompletionMessage.ts
│       └── interactions/          # (Próxima fase)
├── src/support/
│   ├── hooks.ts                   # Before/After hooks
│   └── world.ts                   # Contexto de Cucumber
├── tests/
│   ├── e2e/
│   │   ├── features/
│   │   │   └── compra_flujo_completo.feature
│   │   └── steps/
│   │       ├── compra_flujo_completo.steps.ts
│   │       └── validacion_actor.steps.ts
│   └── api/
│       ├── features/
│       │   └── dummyjson_api.feature
│       └── steps/
│           └── dummyjson_api.steps.ts
└── reports/                       # Reportes generados
    ├── report.json
    ├── cucumber-report.html
    └── screenshots/
```

## 📊 Reportes

### Reportes generados automáticamente:

1. **JSON Report**: `reports/report.json`
   - Formato estándar de Cucumber
   - Compatible con herramientas externas

2. **HTML Report**: `reports/cucumber-report.html`
   - Visualización clara de escenarios
   - Status de cada paso
   - Tiempos de ejecución

3. **Screenshots**: `reports/screenshots/`
   - Capturas en caso de fallos
   - Nombramiento automático con timestamp

### Visualizar reportes:

```bash
# Abrir reporte HTML localmente
open reports/cucumber-report.html

# O en Windows
start reports/cucumber-report.html
```

## 🔐 Credenciales de Prueba

| Plataforma | Usuario | Contraseña |
|-----------|---------|------------|
| SauceDemo | `standard_user` | `secret_sauce` |
| DummyJSON API | `kminchelle` | `0lelplR` |

> ⚠️ **Nota**: Estas son credenciales públicas de demostración. Para producción, utilizar variables de entorno seguras.

## 📝 Patrones y Buenas Prácticas

### Patrón Screenplay

- ✅ **Reutilizable**: Tasks y Questions se usan en múltiples escenarios
- ✅ **Mantenible**: Cambios en UI se reflejan en una sola clase
- ✅ **Legible**: Código que lee como especificaciones BDD

Ejemplo:
```typescript
// Step legible
Given('que el usuario inicia sesión con credenciales válidas', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
});

// Task reutilizable en múltiples escenarios
export class LoginWithValidCredentials {
  async performAs(actor: Actor): Promise<void> {
    // Implementación modular
  }
}
```

### BDD con Gherkin

- ✅ Escenarios en **español** para mayor claridad
- ✅ Lenguaje **no técnico** que entiende el negocio
- ✅ **Automatización de aceptación**

### CI/CD

- ✅ Tests en **cada push/PR**
- ✅ **Artefactos** persistentes
- ✅ **Notificaciones** automáticas
- ✅ Ejecución **paralela** (preparado)

## 🐛 Troubleshooting

### Error: "Cannot find module '@cucumber/cucumber'"
```bash
npm ci
npm install
```

### Playwright falla en CI
```bash
npx playwright install --with-deps
```

### Variables de entorno no se cargan
```bash
# Verificar .env existe
ls -la .env

# Asegurar que dotenv está en config/environment.ts
```

### Tests timeout en GitHub Actions
- Aumentar timeout en `.github/workflows/run-tests.yml`
- Usar `--timeout 60000` en steps

## 📚 Referencias y Documentación

- [Playwright Documentation](https://playwright.dev)
- [Cucumber.js](https://cucumber.io/docs/cucumber/)
- [Patrón Screenplay](https://serenity-bdd.info/docs/guide/principles.html#The%20Screenplay%20Pattern)
- [GitHub Actions](https://docs.github.com/en/actions)
- [DummyJSON API](https://dummyjson.com/docs)
- [SauceDemo](https://saucedemo.com)

## 👤 Autor

**Ingeniero QA Automation Senior**
- Especialidad: TypeScript, Playwright, CI/CD
- Patrón: Screenplay
- Metodología: BDD/Gherkin

## 📄 Licencia

Este proyecto es educativo y se proporciona como referencia para automatización QA.

## 🎉 Estado Actual

| Componente | Estado |
|-----------|--------|
| Arquitectura Screenplay | ✅ Implementado |
| Escenarios E2E | ✅ Implementados (3 escenarios) |
| Pruebas API | ✅ Implementadas (5 escenarios) |
| Pipeline CI/CD | ✅ Configurado |
| Reportes | ✅ Habilitados |
| Documentación | ✅ Completa |

---

**Última actualización**: Noviembre 2025
**Versión**: 1.0.0