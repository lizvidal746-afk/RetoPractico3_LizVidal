/**
 * src/screenplay/questions/CartItems.ts
 * Pregunta que obtiene la cantidad de items en el carrito.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class CartItems {
  async answeredBy(actor) {
    const page = actor.abilityTo(UseBrowser).page;
    const badge = page.locator('.shopping_cart_badge');
    const count = await badge.textContent();
    return count ? parseInt(count, 10) : 0;
  }
}

module.exports = { CartItems };
