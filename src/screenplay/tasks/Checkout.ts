/**
 * src/screenplay/tasks/Checkout.ts
 * Tarea que representa el flujo completo de checkout.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class Checkout {
  constructor(firstName = 'John', lastName = 'Doe', zipCode = '12345') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.zipCode = zipCode;
  }

  static with(firstName, lastName, zipCode) {
    return new Checkout(firstName, lastName, zipCode);
  }

  async performAs(actor) {
    const page = actor.abilityTo(UseBrowser).page;

    // Hacer clic en el carrito
    await page.click('a.shopping_cart_link');
    await page.waitForURL('**/cart.html');

    // Hacer clic en checkout
    await page.click('button#checkout');
    await page.waitForURL('**/checkout-step-one.html');

    // Llenar información del cliente
    await page.fill('input#first-name', this.firstName);
    await page.fill('input#last-name', this.lastName);
    await page.fill('input#postal-code', this.zipCode);

    // Continuar
    await page.click('input#continue');
    await page.waitForURL('**/checkout-step-two.html');

    // Finalizar la compra
    await page.click('button#finish');
    await page.waitForURL('**/checkout-complete.html');
  }
}

module.exports = { Checkout };
