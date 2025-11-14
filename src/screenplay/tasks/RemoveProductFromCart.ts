/**
 * src/screenplay/tasks/RemoveProductFromCart.ts
 * Tarea que remueve un producto del carrito
 */

const { UseBrowser } = require('../abilities/UseBrowser');

class RemoveProductFromCartTask {
  async performAs(actor: any) {
    const page = actor.abilityTo(UseBrowser).page;
    
    // Esperar a que esté disponible el botón de remover
    const removeButton = page.locator('button:has-text("Remove")').first();
    await removeButton.waitFor({ timeout: 5000 });
    
    // Hacer clic en el botón remover
    await removeButton.click();
    
    console.log('Producto removido del carrito');
  }
}

module.exports = { RemoveProductFromCart: RemoveProductFromCartTask };
