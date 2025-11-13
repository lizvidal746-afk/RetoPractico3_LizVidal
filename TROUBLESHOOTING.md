# 🔍 Guía de Troubleshooting y FAQs

## 🚫 Errores Comunes

### Error: "cucumber-js" no se reconoce como un comando

**Síntoma:**
```
"cucumber-js" no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable.
```

**Causa:** Las dependencias de npm no están instaladas.

**Solución:**
```powershell
npm install
```

---

### Error: Cannot find module '@cucumber/cucumber'

**Síntoma:**
```
Cannot find module '@cucumber/cucumber' or its corresponding type declarations
```

**Causa:** Las dependencias específicas no se instalaron correctamente.

**Solución:**
```powershell
npm install --save-dev @cucumber/cucumber
npm install --save-dev @playwright/test
npm install --save-dev typescript ts-node
npm install dotenv
```

---

### Error: Playwright falla con "Browser launch failed"

**Síntoma:**
```
Error: Browser launch failed
```

**Causa:** Los navegadores de Playwright no están instalados.

**Solución:**
```powershell
npx playwright install
# o con dependencias del sistema
npx playwright install --with-deps
```

---

### Error: "timeout 5000ms exceeded"

**Síntoma:**
```
Error: Timeout 5000ms exceeded
```

**Causa:** Los tiempos de espera son muy cortos para la aplicación.

**Soluciones:**

1. Aumentar timeout en steps (en archivos `.steps.ts`):
```typescript
await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle', timeout: 10000 });
```

2. O aumentar globalmente en `cucumber.js`:
```javascript
timeout: 60000  // 60 segundos
```

---

### Error: "Selector did not resolve to any element"

**Síntoma:**
```
Error: Selector "input#nonexistent" did not resolve to any element
```

**Causa:** El selector CSS/XPath no existe en el DOM.

**Solución:**
1. Inspeccionar el elemento en el navegador
2. Actualizar el selector en la tarea correspondiente
3. Usar `page.pause()` en el código para pausar y inspeccionar

---

### Error: "ECONNREFUSED" en pruebas E2E

**Síntoma:**
```
Error: ECONNREFUSED 127.0.0.1:...
```

**Causa:** No se puede conectar a la URL especificada.

**Soluciones:**

1. Verificar que la URL es correcta en `.env`:
```env
BASE_URL_UI=https://www.saucedemo.com
```

2. Verificar conectividad a internet:
```powershell
Test-NetConnection -ComputerName www.saucedemo.com -Port 443
```

3. Usar `HEADLESS=false` para depurar visualmente:
```powershell
$env:HEADLESS='false'; npm run test:e2e
```

---

### Error: "Status code 401 Unauthorized" en pruebas API

**Síntoma:**
```
Error: Status code 401
```

**Causa:** El token de autenticación es inválido o no se envió.

**Soluciones:**

1. Verificar credenciales en `.env`:
```env
API_USERNAME=kminchelle
API_PASSWORD=0lelplR
```

2. Verificar que el step "me he autenticado exitosamente" se ejecuta antes

3. Verificar que el token se está guardando correctamente en `this.setData('authToken', token)`

---

### Error: "Module has no default export"

**Síntoma:**
```
Cannot find default export
```

**Causa:** El archivo de configuración no exporta correctamente.

**Solución:** Asegurar que `environment.ts` tiene:
```typescript
export default config;
```

---

## ⚙️ Configuración

### Cambiar URLs

En `.env`:
```env
BASE_URL_UI=https://www.saucedemo.com     # Para pruebas E2E
BASE_URL_API=https://dummyjson.com        # Para pruebas API
```

### Cambiar Credenciales

**Para Sauce Demo:**
```env
USERNAME=standard_user
PASSWORD=secret_sauce
```

**Otros usuarios disponibles en Sauce Demo:**
- `locked_out_user` (usuario bloqueado)
- `problem_user` (usuario con problemas de UI)
- `performance_glitch_user` (usuario con retrasos)

**Para DummyJSON:**
```env
API_USERNAME=kminchelle
API_PASSWORD=0lelplR
```

### Modo Headless

```env
HEADLESS=true   # Ejecución sin interfaz gráfica (ideal para CI/CD)
HEADLESS=false  # Modo visual (ideal para depuración local)
```

### Ralentizar Navegación

```env
SLOW_MO=1000    # Ralentiza 1 segundo entre acciones (útil para ver qué pasa)
SLOW_MO=0       # Sin ralentización (normal)
```

---

## 🐛 Depuración

### Ver qué está pasando visualmente

1. Cambiar a modo no headless:
```powershell
$env:HEADLESS='false'; npm run test:e2e
```

2. Agregar pausa en el código para inspeccionar:
```typescript
// En cualquier step o task
await page.pause();  // Se detiene aquí
```

3. Ejecutar en modo debug:
```powershell
node --inspect-brk node_modules/.bin/cucumber-js
```

### Verificar selectores

1. En el navegador, usar DevTools (F12)
2. Inspeccionar el elemento
3. Copiar selector
4. Probar en consola:
```javascript
document.querySelector('input#user-name')  // Si devuelve null, el selector está mal
```

### Revisar logs

Los logs se imprimen en consola. Buscar líneas con:
- ✅ (éxito)
- ❌ (error)
- 🔍 (información)

---

## 🚀 Ejecución Avanzada

### Ejecutar un escenario específico

```powershell
# E2E - Ejecutar solo "Camino feliz"
npx cucumber-js --require-module ts-node/register tests/e2e/features --name "Camino feliz"

# API - Ejecutar solo "Autenticación"
npx cucumber-js --require-module ts-node/register tests/api/features --name "Autenticacion"
```

### Ejecutar solo ciertos tags

```powershell
# Si has agregado tags en los .feature
npx cucumber-js --require-module ts-node/register --tags "@smoke"
```

### Generar reporte sin ejecutar tests

```powershell
# Usar reporte anterior (si existe reports/report.json)
npm install --save-dev @cucumber/html-formatter
cat reports/report.json | npx @cucumber/html-formatter > reports/cucumber-report.html
start reports/cucumber-report.html
```

---

## 📊 Reportes

### Ubicación de reportes

```
reports/
├── report.json                # Formato JSON estándar
├── cucumber-report.html       # Reporte visual en HTML
└── screenshots/               # Capturas de fallos
    ├── 1699876543210-Login_fallido.png
    └── 1699876544123-Compra_completa.png
```

### Abrir reportes

**HTML (recomendado):**
```powershell
start reports/cucumber-report.html
```

**JSON (para integración):**
```powershell
# Ver en editor o herramienta de análisis
code reports/report.json
```

---

## 🔄 GitHub Actions

### Ver logs del pipeline

1. Ir a: https://github.com/TU_USUARIO/TU_REPO/actions
2. Hacer clic en el run más reciente
3. Ver los logs de cada paso

### Descargar artefactos

1. En la página del run, bajar a "Artifacts"
2. Descargar `test-reports-XXX` (reportes)
3. Descargar `failure-screenshots-XXX` (si hay fallos)

### Ejecutar manualmente

1. Ir a: https://github.com/TU_USUARIO/TU_REPO/actions/workflows/run-tests.yml
2. Click en "Run workflow"
3. Seleccionar rama
4. Click en "Run workflow" nuevamente

---

## 💡 Tips y Trucos

### Agregar nuevos escenarios rápidamente

1. Copiar un `.feature` existente
2. Cambiar nombre y escenarios
3. Reutilizar steps (no crear nuevos si es posible)
4. Ejecutar: `npm run test:e2e`

### Depuración paso a paso

```typescript
// En un step
console.log('Valor actual:', await page.locator('#element').textContent());

// Tomar screenshot manual
await page.screenshot({ path: 'debug.png' });
```

### Usar variables compartidas entre steps

```typescript
// En un step, guardar dato
this.setData('userId', 123);

// En otro step, recuperarlo
const userId = this.getData('userId');
```

### Medir rendimiento

```typescript
const startTime = Date.now();
await new LoginWithValidCredentials().performAs(actor);
const duration = Date.now() - startTime;
console.log(`⏱️ Login tomó ${duration}ms`);
```

---

## 🆘 Soporte

### Verificar versiones

```powershell
node --version          # Node.js
npm --version           # npm
npx playwright --version  # Playwright
```

### Regenerar dependencias

```powershell
# Limpiar cache
npm cache clean --force

# Reinstalar
rm package-lock.json
npm install
npx playwright install --with-deps
```

### Verificar instalación de Playwright

```powershell
npx playwright codegen https://www.saucedemo.com
# Se debe abrir un navegador con inspector
```

---

## 📝 Checklist para Resolver Problemas

- [ ] ¿Ejecutaste `npm install`?
- [ ] ¿Instalaste navegadores con `npx playwright install`?
- [ ] ¿Tienes `.env` con variables correctas?
- [ ] ¿La URL es alcanzable (conexión a internet)?
- [ ] ¿Los selectores CSS son correctos?
- [ ] ¿Los timeouts son suficientes?
- [ ] ¿El token de API es válido?
- [ ] ¿Revisaste la consola para mensajes de error?
- [ ] ¿Probaste con `HEADLESS=false` para depuración visual?

---

**Última actualización:** Noviembre 13, 2025
