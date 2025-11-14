/**
 * src/screenplay/questions/CartItems.ts
 * Pregunta que obtiene la cantidad de items en el carrito.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class CartItemsQuestion {
  async answeredBy(actor: any) {
    const page = actor.abilityTo(UseBrowser).page;
    const badge = page.locator('.shopping_cart_badge');
    
    // Verificar si el badge existe
    const isVisible = await badge.isVisible().catch(() => false);
    
    if (!isVisible) {
      return 0;
    }
    
    const count = await badge.textContent();
    return count ? parseInt(count, 10) : 0;
  }
}

module.exports = { CartItems: CartItemsQuestion };
