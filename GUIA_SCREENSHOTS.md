# 📸 GUÍA DE SCREENSHOTS - DOCUMENTACIÓN VISUAL DE PRUEBAS

**Actualización:** 14 Noviembre 2025  
**Status:** ✅ Implementado y Funcional

---

## 🎯 Objetivo

Capturar pantallas en cada paso importante de los escenarios de prueba para:
- ✅ Documentar visualmente la ejecución
- ✅ Facilitar debugging en caso de fallos
- ✅ Validar comportamiento real de la aplicación
- ✅ Proporcionar evidencia de ejecución

---

## 📊 CONFIGURACIÓN

### SLOW_MO (Ralentización)
```
Archivo: .env
Variable: SLOW_MO=500

Significado:
- 500ms = 500 milisegundos entre acciones
- Anterior: 0 (sin ralentización)
- Nuevo: Permite ver las acciones de forma clara
```

### Directorio de Screenshots
```
Ubicación: reports/screenshots/
Estructura: [timestamp]-[escenario]-[paso].png
Ejemplo: 1763157423218-escenario1happypath-01loginexitoso.png
```

---

## 📸 SCREENSHOTS POR ESCENARIO

### ESCENARIO 1: CAMINO FELIZ - COMPRA EXITOSA (HAPPY PATH)

**3 capturas**

1. **01_login_exitoso.png**
   - Momento: Después de iniciar sesión con credenciales válidas
   - Qué muestra: Página de inventario cargada, usuario autenticado
   - Propósito: Validar login exitoso

2. **02_producto_en_carrito.png**
   - Momento: Después de agregar producto al carrito
   - Qué muestra: Producto en carrito, badge actualizado
   - Propósito: Validar agregar producto

3. **03_compra_exitosa.png**
   - Momento: Después de completar compra
   - Qué muestra: Página de confirmación con mensaje
   - Propósito: Validar compra completada

---

### ESCENARIO 2: VALIDACIÓN NEGATIVA - LOGIN FALLIDO

**2 capturas**

1. **01_login_fallido.png**
   - Momento: Intento de login con credenciales inválidas
   - Qué muestra: Pantalla de login con error visible
   - Propósito: Capturar intento fallido

2. **02_mensaje_de_error.png**
   - Momento: Error detectado después del login fallido
   - Qué muestra: Mensaje de error en pantalla
   - Propósito: Validar que el error sea mostrado

---

### ESCENARIO 3: VALIDACIÓN DE CARRITO PERSISTENTE

**3 capturas**

1. **01_logout_completado.png**
   - Momento: Después de hacer logout
   - Qué muestra: Usuario regresado a página de login
   - Propósito: Validar logout exitoso

2. **02_nuevo_login.png**
   - Momento: Login nuevamente en la misma sesión
   - Qué muestra: Usuario autenticado nuevamente
   - Propósito: Validar nuevo login

3. **03_carrito_persistente.png**
   - Momento: Estado del carrito en nueva sesión
   - Qué muestra: Carrito con item(s) persistentes
   - Propósito: Validar persistencia del carrito

---

## 📁 ESTRUCTURA COMPLETA DE ARCHIVOS

```
reports/
├── screenshots/ (Directorio principal)
│   ├── Escenario 1 - Happy Path
│   │   ├── 1763157423218-escenario1happypath-01loginexitoso.png
│   │   ├── 1763157423915-escenario1happypath-02productoencarrito.png
│   │   └── 1763157427841-escenario1happypath-03compraexitosa.png
│   │
│   ├── Escenario 2 - Login Fallido
│   │   ├── 1763157434140-escenario2loginfallido-01loginfallido.png
│   │   └── 1763157434241-escenario2loginfallido-02mensajedeerror.png
│   │
│   └── Escenario 3 - Carrito Persistente
│       ├── 1763157447370-escenario3carritopersistente-01logoutcompletado.png
│       ├── 1763157449660-escenario3carritopersistente-02nuevologin.png
│       └── 1763157449775-escenario3carritopersistente-03carritopersistente.png
│
├── cucumber-report.html
└── report.json
```

---

## 🔍 CÓMO VER LAS SCREENSHOTS

### Opción 1: Abrir Archivo Directamente
```powershell
# Explorador Windows
Explorer .\reports\screenshots\

# O abrir imagen específica
Start-Process '.\reports\screenshots\1763157423218-escenario1happypath-01loginexitoso.png'
```

### Opción 2: Ver desde Reporte HTML
1. Abrir: `reports/cucumber-report.html`
2. Las screenshots aparecen en la sección de detalles de cada escenario
3. Hacer clic en la imagen para ampliar

### Opción 3: Buscar por Tipo
```powershell
# Ver solo screenshots de login
Get-ChildItem .\reports\screenshots\*login*.png

# Ver solo screenshots de error
Get-ChildItem .\reports\screenshots\*error*.png

# Ver solo screenshots de happy path
Get-ChildItem .\reports\screenshots\*happypath*.png
```

---

## 📊 CONVENCIÓN DE NOMBRES

**Formato:** `[timestamp]-[escenario]-[paso].png`

Ejemplo:
- `1763157423218` → Timestamp (fecha/hora exacta)
- `escenario1happypath` → Identificador del escenario (sin espacios ni caracteres especiales)
- `01loginexitoso` → Número de paso y descripción

---

## 🛠️ CÓMO FUNCIONA LA CAPTURA

### Código en Step Definitions

```typescript
When('el usuario inicia sesión con credenciales válidas', async function () {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
  console.log('✅ Login exitoso');
  
  // Captura automática
  await ScreenshotUtil.takeScreenshotWithLabel(
    actor, 
    'escenario_1_happy_path', 
    '01_login_exitoso'
  );
});
```

### Utilidad ScreenshotUtil

Ubicación: `src/screenplay/utils/Screenshot.ts`

Métodos disponibles:
- `takeScreenshot(actor, stepName)` - Captura simple
- `takeScreenshotWithLabel(actor, scenarioName, stepName)` - Captura con etiquetas

---

## ⚡ TIEMPO DE EJECUCIÓN

```
Configuración SLOW_MO: 500ms

Impacto:
- Anterior: ~32 segundos (sin screenshots)
- Ahora: ~48 segundos (con 10 screenshots)
- Aumento: +16 segundos (+50%)

Ventaja: Mejor visibilidad de acciones
```

---

## 📋 CHECKLIST DE SCREENSHOTS

- [x] Escenario 1 - Happy Path
  - [x] Login exitoso
  - [x] Producto en carrito
  - [x] Compra completada

- [x] Escenario 2 - Login Fallido
  - [x] Intento login fallido
  - [x] Mensaje de error

- [x] Escenario 3 - Carrito Persistente
  - [x] Logout completado
  - [x] Nuevo login
  - [x] Carrito persistente

---

## 🐛 TROUBLESHOOTING

### P: No veo screenshots
```powershell
# Verificar que existan
Get-ChildItem .\reports\screenshots\

# Si el directorio no existe
New-Item -ItemType Directory -Path .\reports\screenshots -Force

# Re-ejecutar tests
npm run test:e2e
```

### P: Quiero agregar más capturas
```typescript
// En los step definitions
await ScreenshotUtil.takeScreenshotWithLabel(actor, 'scenario_name', 'step_name');
```

### P: Cambiar SLOW_MO
```env
# En .env
SLOW_MO=1000  # Más lento (1 segundo)
SLOW_MO=250   # Más rápido (250ms)
SLOW_MO=0     # Sin ralentización
```

---

## ✨ MEJORAS FUTURAS

1. **Galería HTML**
   - Crear página HTML con galería de screenshots
   - Mostrar en miniaturitas con vista previa

2. **Visual Regression**
   - Comparar screenshots entre ejecuciones
   - Detectar cambios visuales automáticamente

3. **Anotaciones**
   - Agregar texto/flechas a las screenshots
   - Resaltar áreas importantes

4. **Video Recording**
   - Grabar video en lugar de solo screenshots
   - Capturar toda la interacción

5. **Cloud Storage**
   - Subir screenshots a S3/Cloud Storage
   - Generar reportes web compartibles

---

## 📊 ESTADÍSTICAS

| Métrica | Valor |
|---------|-------|
| Total de Screenshots | 10 |
| Escenarios Cubiertos | 3/3 |
| Pasos Documentados | 8/8 |
| Directorio Size | ~X MB |
| Formato | PNG |
| Resolución | Full Screen |

---

## 🎓 EJEMPLO DE USO

### Ejecutar tests y ver screenshots
```powershell
# 1. Ejecutar tests
npm run test:e2e

# 2. Ver screenshots generadas
Get-ChildItem .\reports\screenshots\

# 3. Abrir reporte HTML
Start-Process .\reports\cucumber-report.html

# 4. Ver screenshot específico
Start-Process '.\reports\screenshots\1763157423218-escenario1happypath-01loginexitoso.png'
```

---

## 🚀 INTEGRACIÓN CON CI/CD

En GitHub Actions, los screenshots se generan automáticamente:

```yaml
- name: Run E2E Tests
  run: npm run test:e2e
  
- name: Upload Screenshots
  if: always()
  uses: actions/upload-artifact@v2
  with:
    name: screenshots
    path: reports/screenshots/
```

---

**Documento actualizado:** 14 Noviembre 2025  
**Status:** ✅ Completado y Funcional  
**Contacto:** Equipo QA Automation

