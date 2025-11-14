/**
 * src/screenplay/abilities/UseBrowser.ts
 * Habilidad que permite al actor usar un navegador.
 */

class UseBrowser {
  constructor(page) {
    this.page = page;
  }

  static with(page) {
    return new UseBrowser(page);
  }
}

module.exports = { UseBrowser };
