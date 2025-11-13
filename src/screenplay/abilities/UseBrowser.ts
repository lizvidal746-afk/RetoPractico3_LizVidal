/**
 * src/screenplay/abilities/UseBrowser.ts
 * Habilidad que permite al actor usar un navegador.
 */

import { Page } from 'playwright';

export class UseBrowser {
  constructor(public page: Page) {}

  static with(page: Page): UseBrowser {
    return new UseBrowser(page);
  }
}
