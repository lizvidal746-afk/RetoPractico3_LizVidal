/**
 * src/screenplay/questions/CheckoutCompletionMessage.ts
 * Pregunta que obtiene el mensaje de confirmación de compra.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';

export class CheckoutCompletionMessage {
  async answeredBy(actor: Actor): Promise<string> {
    const page: Page = actor.abilityTo(this.constructor as any).page;
    const messageElement = page.locator('.complete-text');
    return await messageElement.textContent() || '';
  }
}
