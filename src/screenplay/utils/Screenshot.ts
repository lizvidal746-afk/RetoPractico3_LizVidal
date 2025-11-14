/**
 * src/screenplay/utils/Screenshot.ts
 * Utilidad para capturar pantallas en momentos específicos
 */

const path = require('path');
const cfg = require('../../config/environment');

class ScreenshotUtil {
  static async takeScreenshot(actor: any, stepName: string) {
    try {
      const UseBrowser = require('../abilities/UseBrowser').UseBrowser;
      const page = actor.abilityTo(UseBrowser).page;
      
      // Sanitizar nombre del paso
      const sanitizedName = stepName
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase();
      
      const timestamp = Date.now();
      const fileName = `${timestamp}-${sanitizedName}.png`;
      const filePath = path.join(cfg.screenshotDir, fileName);
      
      await page.screenshot({ path: filePath });
      console.log(`📸 Screenshot guardado: ${filePath}`);
      
      return filePath;
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error capturando screenshot: ${errorMsg}`);
      return null;
    }
  }

  static async takeScreenshotWithLabel(actor: any, scenarioName: string, stepName: string) {
    try {
      const UseBrowser = require('../abilities/UseBrowser').UseBrowser;
      const page = actor.abilityTo(UseBrowser).page;
      
      const sanitizedScenario = scenarioName
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase();
      
      const sanitizedStep = stepName
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase();
      
      const timestamp = Date.now();
      const fileName = `${timestamp}-${sanitizedScenario}-${sanitizedStep}.png`;
      const filePath = path.join(cfg.screenshotDir, fileName);
      
      await page.screenshot({ path: filePath });
      console.log(`📸 Screenshot guardado: ./${filePath}`);
      
      return filePath;
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error capturando screenshot: ${errorMsg}`);
      return null;
    }
  }
}

module.exports = { ScreenshotUtil };
