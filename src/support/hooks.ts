const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { ScreenplayWorld: SpWorld } = require('./world');
const { UseBrowser } = require('../screenplay/abilities/UseBrowser');
const config = require('../config/environment');

// Aumentar timeout global de Cucumber a 120 segundos
setDefaultTimeout(120 * 1000);

let browser: any;
let page: any;

Before(async function (this: any) {
  browser = await chromium.launch({ 
    headless: config.headless,
    slowMo: config.slowMo
  });
  page = await browser.newPage();

  this.theActor().can(UseBrowser.with(page));
});

After(async function (this: any, scenario: any) {
  if (scenario.result?.status === 'FAILED') {
    const screenshotPath = `${config.screenshotDir}/${Date.now()}-${scenario.pickle.name.replace(/\s+/g, '_')}.png`;
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot guardado: ${screenshotPath}`);
  }

  await browser.close();
});
