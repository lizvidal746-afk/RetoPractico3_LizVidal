/**
 * src/screenplay/questions/ErrorMessage.ts
 * Pregunta que obtiene el mensaje de error después de un intento de login fallido.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';

export class ErrorMessage {
  async answeredBy(actor: Actor): Promise<string> {
    const page: Page = actor.abilityTo(this.constructor as any).page;
    const errorElement = page.locator('h3[data-test="error"]');
    return await errorElement.textContent() || '';
  }
}
