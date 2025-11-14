/**
 * src/screenplay/tasks/AddProductToCart.ts
 * Tarea que permite agregar un producto al carrito.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class AddProductToCart {
  constructor(productName = 'Sauce Labs Backpack') {
    this.productName = productName;
  }

  static named(productName) {
    return new AddProductToCart(productName);
  }

  async performAs(actor) {
    const page = actor.abilityTo(UseBrowser).page;

    // Buscar el botón "Add to cart" del producto
    const addButton = page.locator(`button:has-text("Add to cart")`).first();
    await addButton.click();
  }
}

module.exports = { AddProductToCart };
