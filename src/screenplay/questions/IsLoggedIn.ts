/**
 * src/screenplay/questions/IsLoggedIn.ts
 * Pregunta que verifica si el usuario está autenticado (se ve el inventario).
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class IsLoggedIn {
  async answeredBy(actor) {
    const page = actor.abilityTo(UseBrowser).page;
    return await page.url().includes('inventory.html');
  }
}

module.exports = { IsLoggedIn };
