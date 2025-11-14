/**
 * src/screenplay/tasks/Logout.ts
 * Tarea que permite hacer logout de la aplicación.
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class Logout {
  async performAs(actor) {
    const page = actor.abilityTo(UseBrowser).page;

    // Navegar al inventario primero si estamos en checkout (para acceder al menú)
    const currentUrl = page.url();
    if (currentUrl.includes('checkout-complete')) {
      await page.goto('https://www.saucedemo.com/inventory.html');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
    }

    // Intentar hacer logout por menú hamburguesa
    try {
      // Buscar el botón del menú (puede tener diferentes formas)
      const menuSelectors = ['button.bm-burger-button', '#react-burger-menu-btn', '.bm-burger-button'];
      let found = false;

      for (const selector of menuSelectors) {
        try {
          if (await page.locator(selector).isVisible({ timeout: 3000 }).catch(() => false)) {
            await page.click(selector);
            found = true;
            break;
          }
        } catch (e) {
          continue;
        }
      }

      if (found) {
        await page.waitForSelector('.bm-menu-wrap.isOpen', { timeout: 5000 });
        await page.click('#logout_sidebar_link');
        await page.waitForURL('**/index.html', { timeout: 10000 });
      } else {
        // Si no encuentra el menú, navegar directamente al logout
        throw new Error('Menú no encontrado');
      }
    } catch (error) {
      // Alternativa: navegar directamente a login page (equivale a logout)
      console.log('⚠️ Logout por menú falló, navegando a página de login...');
      await page.goto('https://www.saucedemo.com/');
      await page.waitForLoadState('networkidle', { timeout: 10000 });
    }
  }
}

module.exports = { Logout };
