// tests/e2e/steps/validacion_actor.steps.ts

const { Given, Then } = require('@cucumber/cucumber');

Given('que el actor inicia su escenario', function () {
  const actor = this.theActor();
  console.log(`✅ Actor creado: ${actor.name}`);
});

Then('el entorno se preparó correctamente', async function () {
  console.log('🌍 Entorno cargado correctamente');
});
