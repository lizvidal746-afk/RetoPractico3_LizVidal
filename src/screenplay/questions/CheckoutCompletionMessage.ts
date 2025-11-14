/**
 * src/screenplay/questions/CheckoutCompletionMessage.ts
 * Pregunta que obtiene el mensaje de confirmación de compra.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class CheckoutCompletionMessage {
  async answeredBy(actor) {
    const page = actor.abilityTo(UseBrowser).page;
    const messageElement = page.locator('.complete-text');
    return await messageElement.textContent() || '';
  }
}

module.exports = { CheckoutCompletionMessage };
