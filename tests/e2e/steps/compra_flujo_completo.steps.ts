const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const config = require('../../../src/config/environment');
const { LoginWithValidCredentials } = require('../../../src/screenplay/tasks/LoginWithValidCredentials');
const { LoginWithInvalidCredentials } = require('../../../src/screenplay/tasks/LoginWithInvalidCredentials');
const { AddProductToCart } = require('../../../src/screenplay/tasks/AddProductToCart');
const { RemoveProductFromCart } = require('../../../src/screenplay/tasks/RemoveProductFromCart');
const { Checkout } = require('../../../src/screenplay/tasks/Checkout');
const { Logout } = require('../../../src/screenplay/tasks/Logout');
const { ErrorMessage } = require('../../../src/screenplay/questions/ErrorMessage');
const { CartItems } = require('../../../src/screenplay/questions/CartItems');
const { CheckoutCompletionMessage } = require('../../../src/screenplay/questions/CheckoutCompletionMessage');
const { UseBrowser } = require('../../../src/screenplay/abilities/UseBrowser');
const { ScreenshotUtil } = require('../../../src/screenplay/utils/Screenshot');

Given('que el usuario está en la página de login de Sauce Demo', async function () {
  const page = this.theActor().abilityTo(UseBrowser).page;
  await page.goto(config.baseUrlUI, { waitUntil: 'networkidle' });
  console.log('Usuario en la página');
});

// ============= ESCENARIO 1: CAMINO FELIZ (HAPPY PATH) =============

When('el usuario inicia sesión con credenciales válidas', async function () {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
  console.log('✅ Login exitoso');
  
  // Screenshot 1: Después de login exitoso
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_1_happy_path', '01_login_exitoso');
});

When('el usuario agrega un producto al carrito', async function () {
  const actor = this.theActor();
  await new AddProductToCart().performAs(actor);
  console.log('Producto agregado');
  
  // Screenshot 2: Después de agregar producto
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_1_happy_path', '02_producto_en_carrito');
});

When('el usuario procede al checkout', async function () {
  const actor = this.theActor();
  await new Checkout().performAs(actor);
  console.log('Checkout completado');
});

Then('la compra debe completarse exitosamente', async function () {
  const actor = this.theActor();
  const message = await new CheckoutCompletionMessage().answeredBy(actor);
  expect(message).toMatch(/Thank you|Your order has been dispatched/);
  console.log('✅ Compra exitosa');
  
  // Screenshot 3: Compra completada
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_1_happy_path', '03_compra_exitosa');
});

// ============= ESCENARIO 2: LOGIN FALLIDO (NEGATIVO) =============

When('el usuario intenta iniciar sesión con credenciales inválidas', async function () {
  const actor = this.theActor();
  await new LoginWithInvalidCredentials().performAs(actor);
  console.log('Intento de login fallido');
  
  // Screenshot 1: Pantalla de login fallido
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_2_login_fallido', '01_login_fallido');
});

Then('debe aparecer un mensaje de error', async function () {
  const actor = this.theActor();
  const error = await new ErrorMessage().answeredBy(actor);
  expect(error).toBeTruthy();
  console.log('❌ Error detectado');
  
  // Screenshot 2: Mensaje de error visible
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_2_login_fallido', '02_mensaje_de_error');
});

// ============= ESCENARIO 3: CARRITO PERSISTENTE =============

When('el usuario hace logout', async function () {
  const actor = this.theActor();
  await new Logout().performAs(actor);
  console.log('Logout completado');
  
  // Screenshot 1: Después del logout
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_3_carrito_persistente', '01_logout_completado');
});

When('el usuario vuelve a iniciar sesión con credenciales válidas', async function () {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
  console.log('Nuevo login exitoso');
  
  // Screenshot 2: Nuevo login
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_3_carrito_persistente', '02_nuevo_login');
});

When('el usuario ve el producto en el carrito', async function () {
  const actor = this.theActor();
  const cartCount = await new CartItems().answeredBy(actor);
  expect(cartCount).toBeGreaterThan(0);
  console.log(`✅ Producto confirmado en carrito: ${cartCount} item(s)`);
  
  // Screenshot 3: Producto en el carrito
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_3_carrito_persistente', '03_producto_en_carrito');
});

When('el usuario remueve el producto del carrito', async function () {
  const actor = this.theActor();
  await new RemoveProductFromCart().performAs(actor);
  console.log('Producto removido');
  
  // Screenshot 4: Pantalla de remover producto
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_3_carrito_persistente', '04_producto_removido');
});

Then('el carrito debe estar vacío en la nueva sesión', async function () {
  const actor = this.theActor();
  const cartCount = await new CartItems().answeredBy(actor);
  expect(cartCount).toBe(0);
  console.log(`✅ Carrito vacío confirmado: ${cartCount} items`);
  
  // Screenshot 5: Carrito vacío
  await ScreenshotUtil.takeScreenshotWithLabel(actor, 'escenario_3_carrito_persistente', '05_carrito_vacio');
});
