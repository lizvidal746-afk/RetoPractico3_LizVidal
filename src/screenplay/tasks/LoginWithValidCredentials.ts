/**
 * src/screenplay/tasks/LoginWithValidCredentials.ts
 * Tarea que representa el flujo de login con credenciales válidas.
 */

const { UseBrowser } = require('../abilities/UseBrowser');
const config = require('../../config/environment');

class LoginWithValidCredentials {
  constructor(username = config.uiUsername, password = config.uiPassword) {
    this.username = username;
    this.password = password;
  }

  static with(username, password) {
    return new LoginWithValidCredentials(username, password);
  }

  async performAs(actor) {
    const page = actor.abilityTo(UseBrowser).page;

    // Navegar a la aplicación
    await page.goto(config.baseUrlUI, { timeout: 30000 });

    // Llenar credenciales
    await page.fill('input#user-name', this.username);
    await page.fill('input#password', this.password);

    // Hacer clic en login
    await page.click('input#login-button');

    // Esperar a que aparezca el elemento del inventario (sin esperar navegación)
    await page.waitForSelector('[data-test="inventory-list"]', { timeout: 60000 });
    
    console.log('✅ Login completado - Página de inventario cargada');
  }
}

module.exports = { LoginWithValidCredentials };
