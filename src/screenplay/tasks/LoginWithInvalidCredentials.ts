/**
 * src/screenplay/tasks/LoginWithInvalidCredentials.ts
 * Tarea que representa el intento de login con credenciales inválidas.
 */

const { UseBrowser } = require('../abilities/UseBrowser');
const config = require('../../config/environment');

class LoginWithInvalidCredentials {
  constructor(username = 'invalid_user', password = 'wrong_password') {
    this.username = username;
    this.password = password;
  }

  static with(username, password) {
    return new LoginWithInvalidCredentials(username, password);
  }

  async performAs(actor) {
    const page = actor.abilityTo(UseBrowser).page;

    // Navegar a la aplicación
    await page.goto(config.baseUrlUI, { waitUntil: 'networkidle' });

    // Llenar credenciales inválidas
    await page.fill('input#user-name', this.username);
    await page.fill('input#password', this.password);

    // Hacer clic en login
    await page.click('input#login-button');
  }
}

module.exports = { LoginWithInvalidCredentials };
