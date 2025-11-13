/**
 * src/screenplay/questions/IsLoggedIn.ts
 * Pregunta que verifica si el usuario está autenticado (se ve el inventario).
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';

export class IsLoggedIn {
  async answeredBy(actor: Actor): Promise<boolean> {
    const page: Page = actor.abilityTo(this.constructor as any).page;
    return await page.url().includes('inventory.html');
  }
}
