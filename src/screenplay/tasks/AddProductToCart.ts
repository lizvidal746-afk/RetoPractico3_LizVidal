/**
 * src/screenplay/tasks/AddProductToCart.ts
 * Tarea que permite agregar un producto al carrito.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';

export class AddProductToCart {
  constructor(private productName: string = 'Sauce Labs Backpack') {}

  static named(productName: string): AddProductToCart {
    return new AddProductToCart(productName);
  }

  async performAs(actor: Actor): Promise<void> {
    const page: Page = actor.abilityTo(this.constructor as any).page;

    // Buscar el botón "Add to cart" del producto
    const addButton = page.locator(`button:has-text("Add to cart")`).first();
    await addButton.click();
  }
}
