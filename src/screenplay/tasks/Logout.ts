/**
 * src/screenplay/tasks/Logout.ts
 * Tarea que permite hacer logout de la aplicación.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';

export class Logout {
  async performAs(actor: Actor): Promise<void> {
    const page: Page = actor.abilityTo(this.constructor as any).page;

    // Abrir el menú lateral
    await page.click('button.bm-burger-button');
    await page.waitForSelector('.bm-menu-wrap.isOpen');

    // Hacer clic en logout
    await page.click('#logout_sidebar_link');
    await page.waitForURL('**/index.html');
  }
}
