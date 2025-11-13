/**
 * src/screenplay/tasks/LoginWithValidCredentials.ts
 * Tarea que representa el flujo de login con credenciales válidas.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';
import { config } from '../../config/environment';

export class LoginWithValidCredentials {
  constructor(private username: string = config.uiUsername, private password: string = config.uiPassword) {}

  static with(username?: string, password?: string): LoginWithValidCredentials {
    return new LoginWithValidCredentials(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    const page: Page = actor.abilityTo(this.constructor as any).page;

    // Navegar a la aplicación
    await page.goto(config.baseUrlUI, { waitUntil: 'networkidle' });

    // Llenar credenciales
    await page.fill('input#user-name', this.username);
    await page.fill('input#password', this.password);

    // Hacer clic en login
    await page.click('input#login-button');

    // Esperar a que se cargue la página de inventario
    await page.waitForURL('**/inventory.html', { waitUntil: 'networkidle' });
  }
}
