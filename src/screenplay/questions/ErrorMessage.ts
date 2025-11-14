/**
 * src/screenplay/questions/ErrorMessage.ts
 * Pregunta que obtiene el mensaje de error después de un intento de login fallido.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class ErrorMessageQuestion {
  async answeredBy(actor: any) {
    const page = actor.abilityTo(UseBrowser).page;
    const errorElement = page.locator('h3[data-test="error"]');
    return await errorElement.textContent() || '';
  }
}

module.exports = { ErrorMessage: ErrorMessageQuestion };
