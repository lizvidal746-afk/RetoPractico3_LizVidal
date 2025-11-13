/**
 * src/screenplay/tasks/LoginWithInvalidCredentials.ts
 * Tarea que representa el intento de login con credenciales inválidas.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';
import { config } from '../../config/environment';

export class LoginWithInvalidCredentials {
  constructor(private username: string = 'invalid_user', private password: string = 'wrong_password') {}

  static with(username?: string, password?: string): LoginWithInvalidCredentials {
    return new LoginWithInvalidCredentials(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    const page: Page = actor.abilityTo(this.constructor as any).page;

    // Navegar a la aplicación
    await page.goto(config.baseUrlUI, { waitUntil: 'networkidle' });

    // Llenar credenciales inválidas
    await page.fill('input#user-name', this.username);
    await page.fill('input#password', this.password);

    // Hacer clic en login
    await page.click('input#login-button');
  }
}
