// tests/e2e/steps/validacion_actor.steps.ts

import { Given, Then } from '@cucumber/cucumber';
import { ScreenplayWorld } from '../../src/support/world';


Given('que el actor inicia su escenario', function (this: ScreenplayWorld) {
  const actor = this.theActor();
  console.log(`✅ Actor creado: ${actor.name}`);
});

Then('el entorno se preparó correctamente', async function () {
  console.log('🌍 Entorno cargado correctamente');
});
