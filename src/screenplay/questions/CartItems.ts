/**
 * src/screenplay/questions/CartItems.ts
 * Pregunta que obtiene la cantidad de items en el carrito.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';

export class CartItems {
  async answeredBy(actor: Actor): Promise<number> {
    const page: Page = actor.abilityTo(this.constructor as any).page;
    const badge = page.locator('.shopping_cart_badge');
    const count = await badge.textContent();
    return count ? parseInt(count, 10) : 0;
  }
}
