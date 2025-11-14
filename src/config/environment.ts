/**
 * src/config/environment.ts
 * Carga y valida las variables de entorno necesarias para el proyecto.
 */

const dotenv = require('dotenv');

dotenv.config();

const config = {
  // UI URLs
  baseUrlUI: process.env.BASE_URL_UI || 'https://www.saucedemo.com',

  // API URLs
  baseUrlAPI: process.env.BASE_URL_API || 'https://dummyjson.com',

  // Credenciales UI
  uiUsername: process.env.TEST_USERNAME || 'standard_user',
  uiPassword: process.env.TEST_PASSWORD || 'secret_sauce',

  // Credenciales API
  apiUsername: process.env.API_USERNAME || 'kminchelle',
  apiPassword: process.env.API_PASSWORD || '0lelplR',

  // Configuración del navegador
  headless: process.env.HEADLESS === 'true' || false,
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),

  // Directorios de reportes
  reportDir: process.env.REPORT_DIR || './reports',
  screenshotDir: process.env.SCREENSHOT_DIR || './reports/screenshots',
};

module.exports = config;
