/**
 * tests/e2e/steps/compra_flujo_completo.steps.ts
 * Step definitions para los escenarios de compra.
 */

import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ScreenplayWorld } from '../../src/support/world';
import { config } from '../../src/config/environment';
import { LoginWithValidCredentials } from '../../src/screenplay/tasks/LoginWithValidCredentials';
import { LoginWithInvalidCredentials } from '../../src/screenplay/tasks/LoginWithInvalidCredentials';
import { AddProductToCart } from '../../src/screenplay/tasks/AddProductToCart';
import { Checkout } from '../../src/screenplay/tasks/Checkout';
import { Logout } from '../../src/screenplay/tasks/Logout';
import { IsLoggedIn } from '../../src/screenplay/questions/IsLoggedIn';
import { ErrorMessage } from '../../src/screenplay/questions/ErrorMessage';
import { CartItems } from '../../src/screenplay/questions/CartItems';
import { CheckoutCompletionMessage } from '../../src/screenplay/questions/CheckoutCompletionMessage';
import { Page } from 'playwright';

// Helpers para acceder a Page desde el actor
function getPage(world: ScreenplayWorld): Page {
  return (world.theActor().abilityTo(Object) as any).page;
}

Given('que el usuario está en la página de login de Sauce Demo', async function (this: ScreenplayWorld) {
  const page = getPage(this);
  await page.goto(config.baseUrlUI, { waitUntil: 'networkidle' });
  console.log(`✓ Usuario en la página: ${config.baseUrlUI}`);
});

When('el usuario inicia sesión con credenciales válidas', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
  console.log('✓ Login exitoso con credenciales válidas');
});

When('el usuario agrega un producto al carrito', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new AddProductToCart().performAs(actor);
  console.log('✓ Producto agregado al carrito');
});

When('el usuario procede al checkout', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new Checkout().performAs(actor);
  console.log('✓ Checkout completado');
});

Then('la compra debe completarse exitosamente', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  const message = await new CheckoutCompletionMessage().answeredBy(actor);
  expect(message).toContain('Thank you');
  console.log(`✓ Mensaje de confirmación: ${message}`);
});

When('el usuario intenta iniciar sesión con credenciales inválidas', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new LoginWithInvalidCredentials().performAs(actor);
  console.log('✓ Intento de login con credenciales inválidas');
});

Then('debe aparecer un mensaje de error', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  const error = await new ErrorMessage().answeredBy(actor);
  expect(error).toBeTruthy();
  console.log(`✓ Mensaje de error detectado: ${error}`);
});

When('el usuario hace logout', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new Logout().performAs(actor);
  console.log('✓ Logout completado');
});

When('el usuario vuelve a iniciar sesión con credenciales válidas', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  await new LoginWithValidCredentials().performAs(actor);
  console.log('✓ Login exitoso nuevamente');
});

Then('el carrito debe estar vacío en la nueva sesión', async function (this: ScreenplayWorld) {
  const actor = this.theActor();
  const cartCount = await new CartItems().answeredBy(actor);
  expect(cartCount).toBe(0);
  console.log(`✓ Carrito vacío (items: ${cartCount})`);
});
