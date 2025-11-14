## 🏗️ ARQUITECTURA SCREENPLAY - Guía Técnica

### 📁 Estructura del Proyecto

```
src/
├── config/
│   └── environment.ts          # Configuración centralizada (URLs, credenciales, timeouts)
│
├── screenplay/
│   ├── actors/
│   │   ├── Actor.ts            # Clase base - representa al usuario
│   │   └── Cast.ts             # Factory de actores
│   │
│   ├── abilities/
│   │   ├── UseBrowser.ts        # Habilidad: usar navegador Playwright
│   │   └── CallAPI.ts           # Habilidad: hacer llamadas HTTP a APIs
│   │
│   ├── tasks/
│   │   ├── LoginWithValidCredentials.ts        # Tarea: Login exitoso
│   │   ├── LoginWithInvalidCredentials.ts      # Tarea: Login fallido
│   │   ├── AddProductToCart.ts                 # Tarea: Agregar producto
│   │   ├── Checkout.ts                         # Tarea: Completar compra
│   │   └── Logout.ts                           # Tarea: Cerrar sesión
│   │
│   ├── questions/
│   │   ├── IsLoggedIn.ts                       # Pregunta: ¿Estoy logueado?
│   │   ├── ErrorMessage.ts                     # Pregunta: ¿Hay error?
│   │   ├── CartItems.ts                        # Pregunta: ¿Cuántos items en carrito?
│   │   └── CheckoutCompletionMessage.ts        # Pregunta: ¿Compra completada?
│   │
│   └── interactions/              # (Opcional) Acciones reutilizables de UI
│
├── support/
│   ├── hooks.ts                # Before/After hooks
│   └── world.ts                # ScreenplayWorld (contexto de Cucumber)
│
└── api/                        # (Opcional) Helpers para pruebas API
```

### 🎭 Patrón Screenplay

#### 1. **Actor** (Usuario)
- Entidad que ejecuta acciones
- Almacena "habilidades" (abilities)
- Ejecuta "tareas" (tasks)
- Responde "preguntas" (questions)

```typescript
const actor = cast.actorCalled('Usuario Web');
actor.can(UseBrowser.with(page));
await actor.abilityTo(UseBrowser).page.goto(url);
```

#### 2. **Abilities** (Habilidades)
- Acceso a herramientas: navegador, API context
- Wrappean Playwright API
- Reutilizables entre test

```typescript
const browser = actor.abilityTo(UseBrowser).page;
await browser.click('button[name="login"]');
```

#### 3. **Tasks** (Tareas)
- Acciones de usuario: login, compra, logout
- `performAs(actor)` - se ejecuta en contexto del actor
- Reutilizables en múltiples escenarios

```typescript
await new LoginWithValidCredentials().performAs(actor);
```

#### 4. **Questions** (Preguntas)
- Validaciones / Assertions
- `answeredBy(actor)` - consulta estado
- Devuelven valores para assertion

```typescript
const message = await new CheckoutCompletionMessage().answeredBy(actor);
expect(message).toContain('Thank you');
```

### 🔄 Flujo de Ejecución

```
Feature (Gherkin)
    ↓
Step Definition
    ↓
Actor → Task (performAs)
    ↓
Ability (UseBrowser)
    ↓
Playwright (page.click, page.fill, etc)
    ↓
Question (answeredBy)
    ↓
Assertion (expect)
```

### 📊 Matriz de Cobertura

| Componente | Archivo | Estado | Propósito |
|-----------|---------|--------|----------|
| Actor | ✅ | Completo | Base del patrón |
| Cast | ✅ | Completo | Factory de actores |
| UseBrowser | ✅ | Completo | Navegador Playwright |
| CallAPI | ✅ | Completo | Contexto API |
| LoginWithValidCredentials | ✅ | Completo | Login exitoso |
| LoginWithInvalidCredentials | ✅ | Completo | Login negativo |
| AddProductToCart | ✅ | Completo | Agregar al carrito |
| Checkout | ✅ | Completo | Completar compra |
| Logout | ✅ | Completo | Cerrar sesión |
| IsLoggedIn | ✅ | Completo | Validar login |
| ErrorMessage | ✅ | Completo | Validar error |
| CartItems | ✅ | Completo | Contar items |
| CheckoutCompletionMessage | ✅ | Completo | Validar compra exitosa |

### ✅ Estado de PASO 1
- ✅ Estructura Screenplay validada
- ✅ Todas las clases base implementadas
- ✅ Separación de capas correcta
- ✅ Configuración centralizada
- ✅ Reutilización de componentes garantizada

**ESTADO: LISTO PARA PASO 2**
