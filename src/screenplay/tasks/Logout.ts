/**
 * src/screenplay/tasks/Logout.ts
 * Tarea que permite hacer logout de la aplicación.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class Logout {
  async performAs(actor) {
    const page = actor.abilityTo(UseBrowser).page;

    // Abrir el menú lateral
    await page.click('button.bm-burger-button');
    await page.waitForSelector('.bm-menu-wrap.isOpen');

    // Hacer clic en logout
    await page.click('#logout_sidebar_link');
    await page.waitForURL('**/index.html');
  }
}

module.exports = { Logout };
