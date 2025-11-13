/**
 * src/support/hooks.ts
 * Hooks de Cucumber.
 * Aquí se inicializa y cierra el navegador antes y después de cada escenario.
 */

import { Before, After, ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { ScreenplayWorld } from './world';
import { config } from '../config/environment';

let browser: Browser;
let page: Page;

/**
 * Before: Se ejecuta antes de cada escenario.
 * Aquí abrimos el navegador y guardamos la página para que el Actor pueda usarla.
 */
Before(async function (this: ScreenplayWorld) {
  browser = await chromium.launch({ 
    headless: config.headless,
    slowMo: config.slowMo
  });
  page = await browser.newPage();

  // Guardamos la página como una habilidad del actor
  this.theActor().can({ page });
});

/**
 * After: Se ejecuta después de cada escenario.
 * Si falla, toma un screenshot. Luego cierra el navegador.
 */
After(async function (this: ScreenplayWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === 'failed') {
    const screenshotPath = `${config.screenshotDir}/${Date.now()}-${scenario.pickle.name.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot guardado: ${screenshotPath}`);
  }

  await browser.close();
});
