# 🏗️ Arquitectura y Patrón Screenplay

## Introducción al Patrón Screenplay

El **Patrón Screenplay** es un paradigma moderno de automatización que proporciona:

- ✅ Separación clara de responsabilidades
- ✅ Código altamente reutilizable
- ✅ Fácil mantenimiento
- ✅ Legibilidad cercana a lenguaje natural

---

## Componentes Clave

### 1️⃣ Actors (Actores)

**Ubicación:** `src/screenplay/actors/`

Los actores representan los "usuarios" o "agentes" que ejecutan acciones.

```typescript
// src/screenplay/actors/Actor.ts
export class Actor {
  private abilities: Map<string, any> = new Map();

  can(ability: any): this {
    this.abilities.set(ability.constructor.name, ability);
    return this;
  }

  abilityTo<T>(abilityType: new (...args: any[]) => T): T {
    const ability = this.abilities.get(abilityType.name);
    if (!ability) {
      throw new Error(`El actor ${this.name} no tiene la habilidad requerida`);
    }
    return ability as T;
  }
}
```

**Uso:**
```typescript
const actor = this.theActor('Usuario Web');
actor.can(UseBrowser.with(page));
actor.can(CallAPI.with(apiContext));
```

### 2️⃣ Abilities (Habilidades)

**Ubicación:** `src/screenplay/abilities/`

Las habilidades son capacidades que un actor puede poseer. Ejemplo: navegar un navegador, hacer llamadas HTTP.

```typescript
// src/screenplay/abilities/UseBrowser.ts
export class UseBrowser {
  constructor(public page: Page) {}

  static with(page: Page): UseBrowser {
    return new UseBrowser(page);
  }
}

// src/screenplay/abilities/CallAPI.ts
export class CallAPI {
  private token?: string;

  constructor(public apiContext: APIRequestContext) {}

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | undefined {
    return this.token;
  }
}
```

**Ventajas:**
- Encapsulan el cómo acceder a recursos
- Se reutilizan en todas las tareas
- Fácil de mockar o cambiar

### 3️⃣ Tasks (Tareas)

**Ubicación:** `src/screenplay/tasks/`

Las tareas representan **acciones de usuario completas**. No son low-level (hacer clic), sino alto-nivel (realizar login).

```typescript
// src/screenplay/tasks/LoginWithValidCredentials.ts
export class LoginWithValidCredentials {
  constructor(
    private username: string = config.uiUsername,
    private password: string = config.uiPassword
  ) {}

  static with(username?: string, password?: string): LoginWithValidCredentials {
    return new LoginWithValidCredentials(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    const page: Page = actor.abilityTo(UseBrowser).page;

    await page.goto(config.baseUrlUI, { waitUntil: 'networkidle' });
    await page.fill('input#user-name', this.username);
    await page.fill('input#password', this.password);
    await page.click('input#login-button');
    await page.waitForURL('**/inventory.html');
  }
}
```

**Ejemplo de uso:**
```typescript
Given('el usuario inicia sesión con credenciales válidas', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
});
```

**Ventajas:**
- Encapsulación completa de acciones
- Nombre descriptivo = legibilidad
- Reutilizable en múltiples escenarios
- Cambios en la UI afectan solo la tarea

### 4️⃣ Questions (Preguntas)

**Ubicación:** `src/screenplay/questions/`

Las preguntas representan **validaciones o aserciones** sobre el estado actual.

```typescript
// src/screenplay/questions/IsLoggedIn.ts
export class IsLoggedIn {
  async answeredBy(actor: Actor): Promise<boolean> {
    const page: Page = actor.abilityTo(UseBrowser).page;
    return await page.url().includes('inventory.html');
  }
}

// src/screenplay/questions/ErrorMessage.ts
export class ErrorMessage {
  async answeredBy(actor: Actor): Promise<string> {
    const page: Page = actor.abilityTo(UseBrowser).page;
    const errorElement = page.locator('h3[data-test="error"]');
    return await errorElement.textContent() || '';
  }
}
```

**Ejemplo de uso:**
```typescript
Then('debe aparecer un mensaje de error', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  const error = await new ErrorMessage().answeredBy(actor);
  expect(error).toBeTruthy();
});
```

**Ventajas:**
- Preguntas legibles en inglés/español
- Devoluciones tipadas
- Fáciles de testear independientemente

### 5️⃣ Interactions (Interacciones) - Opcional

**Ubicación:** `src/screenplay/interactions/`

Las interacciones son **acciones low-level** (hacer clic, llenar campo). Generalmente se usan dentro de Tasks.

```typescript
// Ejemplo (no implementado aún, para fase futura)
export class Click {
  constructor(private selector: string) {}

  async performAs(actor: Actor): Promise<void> {
    const page = actor.abilityTo(UseBrowser).page;
    await page.click(this.selector);
  }
}
```

---

## Flujo de Ejecución

```
1. Scenario BDD (Gherkin)
   ↓
2. Step Definition (When, Given, Then)
   ↓
3. Task.performAs(actor)
   ↓
4. actor.abilityTo(UseBrowser|CallAPI)
   ↓
5. Playwright/API call
   ↓
6. Question.answeredBy(actor) / expect()
```

---

## Ejemplo Completo: Compra en Sauce Demo

### Escenario .feature
```gherkin
Scenario: Compra exitosa
  Given que el usuario está en la página de login
  When el usuario inicia sesión con credenciales válidas
  And el usuario agrega un producto al carrito
  And el usuario procede al checkout
  Then la compra debe completarse exitosamente
```

### Steps
```typescript
Given('que el usuario está en la página de login', async function (this: ScreenplayWorld) {
  const page = getPage(this);
  await page.goto(config.baseUrlUI);
});

When('el usuario inicia sesión con credenciales válidas', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
});

And('el usuario agrega un producto al carrito', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new AddProductToCart().performAs(actor);
});

And('el usuario procede al checkout', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new Checkout().performAs(actor);
});

Then('la compra debe completarse exitosamente', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  const message = await new CheckoutCompletionMessage().answeredBy(actor);
  expect(message).toContain('Thank you');
});
```

---

## Ventajas del Patrón

### Para QA

| Aspecto | Beneficio |
|--------|----------|
| Reutilización | Una tarea se usa en N escenarios |
| Mantenibilidad | Cambios centralizados en Tasks |
| Legibilidad | Código que lee como requisitos |
| Depuración | Fácil de aislar y testear |
| Documentación | El código es la documentación |

### Para Desarrollo

- No necesitas saber detalles de implementación
- El framework es escalable
- Fácil agregar nuevas habilidades
- Facilita mocking y testing unitario

### Para Negocio

- Requisitos entendibles (BDD)
- Trazabilidad completa
- Reportes claros
- Mantenimiento a largo plazo

---

## Estructura de Carpetas Recomendada

```
src/
├── config/
│   └── environment.ts              # Configuración centralizada
├── screenplay/
│   ├── abilities/
│   │   ├── UseBrowser.ts          # ✅ Implementado
│   │   ├── CallAPI.ts             # ✅ Implementado
│   │   └── [próximas habilidades]
│   ├── actors/
│   │   ├── Actor.ts               # ✅ Implementado
│   │   └── Cast.ts                # ✅ Implementado
│   ├── tasks/
│   │   ├── LoginWithValidCredentials.ts       # ✅ Implementado
│   │   ├── LoginWithInvalidCredentials.ts     # ✅ Implementado
│   │   ├── AddProductToCart.ts    # ✅ Implementado
│   │   ├── Checkout.ts            # ✅ Implementado
│   │   ├── Logout.ts              # ✅ Implementado
│   │   └── [próximas tareas]
│   ├── interactions/              # Para fase 2
│   │   └── [interacciones UI]
│   └── questions/
│       ├── IsLoggedIn.ts          # ✅ Implementado
│       ├── ErrorMessage.ts        # ✅ Implementado
│       ├── CartItems.ts           # ✅ Implementado
│       ├── CheckoutCompletionMessage.ts  # ✅ Implementado
│       └── [próximas preguntas]
└── support/
    ├── hooks.ts                   # ✅ Implementado
    └── world.ts                   # ✅ Implementado
```

---

## Escalabilidad

### Agregar Nueva Habilidad

```typescript
// src/screenplay/abilities/UseDatabase.ts
export class UseDatabase {
  constructor(private connection: any) {}

  static with(connection: any): UseDatabase {
    return new UseDatabase(connection);
  }
}

// En hooks.ts
Before(async function (this: ScreenplayWorld) {
  const db = await connectDatabase();
  this.theActor().can(UseDatabase.with(db));
});
```

### Agregar Nueva Tarea

```typescript
// src/screenplay/tasks/SearchProduct.ts
export class SearchProduct {
  constructor(private productName: string) {}

  static named(productName: string): SearchProduct {
    return new SearchProduct(productName);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.abilityTo(UseBrowser).page;
    await page.fill('input.search', this.productName);
    await page.press('input.search', 'Enter');
  }
}
```

### Agregar Nueva Pregunta

```typescript
// src/screenplay/questions/SearchResults.ts
export class SearchResults {
  async answeredBy(actor: Actor): Promise<number> {
    const page = actor.abilityTo(UseBrowser).page;
    const results = page.locator('.product-item');
    return await results.count();
  }
}
```

---

## Testing Unitario (Fase Futura)

```typescript
describe('Actor and Abilities', () => {
  it('should add and retrieve ability', () => {
    const actor = new Actor('TestActor');
    const mockPage = {} as Page;
    
    actor.can(UseBrowser.with(mockPage));
    
    expect(actor.hasAbility(UseBrowser)).toBe(true);
    expect(actor.abilityTo(UseBrowser).page).toBe(mockPage);
  });

  it('should throw error if ability not found', () => {
    const actor = new Actor('TestActor');
    
    expect(() => {
      actor.abilityTo(CallAPI);
    }).toThrow('no tiene la habilidad requerida');
  });
});
```

---

## BDD con Cucumber

### Ventajas de usar Cucumber + Screenplay

| Aspecto | Ventaja |
|--------|---------|
| Lenguaje Gherkin | Requisitos entendibles por negocio |
| Colaboración | Equipos entienden los tests |
| Documentación Viva | Los tests = requisitos actualizados |
| Screenplay | Código reutilizable y mantenible |

### Ciclo de Desarrollo

```
1. Escribir escenario .feature (BDD)
   ↓
2. Implementar steps (glue code)
   ↓
3. Crear/reutilizar Tasks y Questions
   ↓
4. Ejecutar y validar
   ↓
5. Refactorizar si es necesario
```

---

## Mejores Prácticas

### ✅ DO's

- Usa nombres descriptivos en Tasks y Questions
- Reutiliza Tasks existentes cuando sea posible
- Encapsula la lógica de UI en Tasks
- Mantén Questions pequeñas y específicas
- Documenta el propósito de cada componente

### ❌ DON'Ts

- No pongas lógica de UI directamente en steps
- No crees Tasks duplicadas
- No hagas Questions que devuelvan múltiples valores
- No hardcodees selectores (extráe a constants si es necesario)
- No mezcles lógica de negocio con automatización

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────┐
│      Cucumber Features (.feature)   │
│    (Escenarios en Gherkin)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Step Definitions (steps/*.ts)   │
│    (When, Given, Then, etc.)        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      Actor (theActor())             │
│  (Entidad que ejecuta acciones)     │
└──────────┬──────────────────────────┘
           │
     ┌─────┴──────────┬──────────────┐
     ▼                ▼              ▼
  ┌──────┐        ┌────────┐    ┌──────────┐
  │ Tasks│        │Questions│   │Abilities │
  │ ────│        │─────────│   │──────────│
  │ • L │        │ • IsLog │   │ • UseBrowser
  │ • A │        │ • Error │   │ • CallAPI
  │ • C │        │ • Cart  │
  └──────┘        └────────┘    └──────────┘
     │                ▼              │
     └────────┬───────┘──────┬───────┘
              ▼              ▼
      ┌──────────────┐  ┌──────────────┐
      │  Playwright  │  │ APIContext   │
      │  (Browser)   │  │ (HTTP)       │
      └──────────────┘  └──────────────┘
             ▼                ▼
      ┌────────────────────────────────┐
      │   AUT / External Services      │
      │  • SauceDemo                   │
      │  • DummyJSON API               │
      └────────────────────────────────┘
```

---

## Referencias

- [Serenity BDD - Screenplay Pattern](https://serenity-bdd.info/docs/guide/principles.html#The%20Screenplay%20Pattern)
- [Playwright Documentation](https://playwright.dev)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

---

**Última actualización:** Noviembre 13, 2025
