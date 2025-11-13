/**
 * src/screenplay/tasks/Checkout.ts
 * Tarea que representa el flujo completo de checkout.
 */

import { Page } from 'playwright';
import { Actor } from '../actors/Actor';

export class Checkout {
  constructor(
    private firstName: string = 'John',
    private lastName: string = 'Doe',
    private zipCode: string = '12345'
  ) {}

  static with(firstName?: string, lastName?: string, zipCode?: string): Checkout {
    return new Checkout(firstName, lastName, zipCode);
  }

  async performAs(actor: Actor): Promise<void> {
    const page: Page = actor.abilityTo(this.constructor as any).page;

    // Hacer clic en el carrito
    await page.click('a.shopping_cart_link');
    await page.waitForURL('**/cart.html');

    // Hacer clic en checkout
    await page.click('button#checkout');
    await page.waitForURL('**/checkout-step-one.html');

    // Llenar información del cliente
    await page.fill('input#first-name', this.firstName);
    await page.fill('input#last-name', this.lastName);
    await page.fill('input#postal-code', this.zipCode);

    // Continuar
    await page.click('input#continue');
    await page.waitForURL('**/checkout-step-two.html');

    // Finalizar la compra
    await page.click('button#finish');
    await page.waitForURL('**/checkout-complete.html');
  }
}
