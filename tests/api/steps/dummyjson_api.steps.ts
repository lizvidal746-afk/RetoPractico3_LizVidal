/**
 * tests/api/steps/dummyjson_api.steps.ts
 * Step definitions para pruebas de API contra DummyJSON.
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { APIRequestContext, request } from 'playwright';
import { config } from '../../src/config/environment';
import { ScreenplayWorld } from '../../src/support/world';

let apiContext: APIRequestContext;
let lastResponse: any;
let authToken: string = '';

Given('que estoy usando la API de DummyJSON', async function (this: ScreenplayWorld) {
  apiContext = await request.newContext();
  console.log(`✓ Contexto de API iniciado para: ${config.baseUrlAPI}`);
});

When('realizo un POST a /auth/login con credenciales válidas', async function (this: ScreenplayWorld) {
  const response = await apiContext.post(`${config.baseUrlAPI}/auth/login`, {
    data: {
      username: config.apiUsername,
      password: config.apiPassword,
    },
  });

  lastResponse = {
    status: response.status(),
    body: await response.json(),
  };

  console.log(`✓ POST /auth/login - Status: ${lastResponse.status}`);
});

Then('el status code debe ser 200', async function () {
  expect(lastResponse.status).toBe(200);
  console.log(`✓ Status code validado: ${lastResponse.status}`);
});

Then('la respuesta debe contener un token válido', async function (this: ScreenplayWorld) {
  expect(lastResponse.body).toHaveProperty('accessToken');
  expect(lastResponse.body.accessToken).toBeTruthy();

  // Guardamos el token para usar en requests posteriores
  authToken = lastResponse.body.accessToken;
  this.setData('authToken', authToken);

  console.log(`✓ Token obtenido y guardado`);
});

Then('el ID del usuario debe estar presente', async function () {
  expect(lastResponse.body).toHaveProperty('id');
  expect(lastResponse.body.id).toBeGreaterThan(0);
  console.log(`✓ ID de usuario validado: ${lastResponse.body.id}`);
});

When('realizo un POST a /auth/login con credenciales inválidas', async function (this: ScreenplayWorld) {
  const response = await apiContext.post(`${config.baseUrlAPI}/auth/login`, {
    data: {
      username: 'invalidUser',
      password: 'wrongPassword',
    },
  });

  lastResponse = {
    status: response.status(),
    body: await response.json(),
  };

  console.log(`✓ POST /auth/login (credenciales inválidas) - Status: ${lastResponse.status}`);
});

Then('el status code debe ser 400 o 401', async function () {
  expect([400, 401]).toContain(lastResponse.status);
  console.log(`✓ Status code esperado (400/401): ${lastResponse.status}`);
});

Then('debe aparecer un mensaje de error', async function () {
  expect(lastResponse.body).toHaveProperty('message');
  expect(lastResponse.body.message).toBeTruthy();
  console.log(`✓ Mensaje de error detectado: ${lastResponse.body.message}`);
});

Given('me he autenticado exitosamente', async function (this: ScreenplayWorld) {
  if (!authToken) {
    const response = await apiContext.post(`${config.baseUrlAPI}/auth/login`, {
      data: {
        username: config.apiUsername,
        password: config.apiPassword,
      },
    });

    const body = await response.json();
    authToken = body.accessToken;
    this.setData('authToken', authToken);
  }

  console.log(`✓ Autenticación completada. Token disponible`);
});

When('realizo un GET a /users', async function () {
  const response = await apiContext.get(`${config.baseUrlAPI}/users`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  lastResponse = {
    status: response.status(),
    body: await response.json(),
  };

  console.log(`✓ GET /users - Status: ${lastResponse.status}`);
});

Then('la respuesta debe contener un array de usuarios', async function () {
  expect(Array.isArray(lastResponse.body.users)).toBe(true);
  expect(lastResponse.body.users.length).toBeGreaterThan(0);
  console.log(`✓ Array de usuarios encontrado (${lastResponse.body.users.length} usuarios)`);
});

Then('cada usuario debe tener las propiedades requeridas', async function () {
  const requiredProps = ['id', 'username', 'email', 'firstName', 'lastName'];
  const firstUser = lastResponse.body.users[0];

  requiredProps.forEach((prop) => {
    expect(firstUser).toHaveProperty(prop);
  });

  console.log(`✓ Propiedades requeridas validadas en usuario: ${firstUser.username}`);
});

When('realizo un GET a /users/{id} con token', async function (this: ScreenplayWorld) {
  const userId = 1; // Usando usuario con ID 1

  const response = await apiContext.get(`${config.baseUrlAPI}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  lastResponse = {
    status: response.status(),
    body: await response.json(),
  };

  this.setData('userId', userId);

  console.log(`✓ GET /users/${userId} - Status: ${lastResponse.status}`);
});

Then('la respuesta debe contener los datos del usuario', async function () {
  expect(lastResponse.body).toHaveProperty('id');
  expect(lastResponse.body).toHaveProperty('username');
  expect(lastResponse.body).toHaveProperty('email');
  console.log(`✓ Datos del usuario validados: ${lastResponse.body.username}`);
});

When('realizo un GET a /products con paginación', async function () {
  const response = await apiContext.get(`${config.baseUrlAPI}/products?limit=10&skip=0`);

  lastResponse = {
    status: response.status(),
    body: await response.json(),
  };

  console.log(`✓ GET /products - Status: ${lastResponse.status}`);
});

Then('la respuesta debe contener un array de productos', async function () {
  expect(Array.isArray(lastResponse.body.products)).toBe(true);
  expect(lastResponse.body.products.length).toBeGreaterThan(0);
  console.log(`✓ Array de productos encontrado (${lastResponse.body.products.length} productos)`);
});

Then('cada producto debe tener precio y stock', async function () {
  const firstProduct = lastResponse.body.products[0];

  expect(firstProduct).toHaveProperty('price');
  expect(firstProduct).toHaveProperty('stock');
  expect(typeof firstProduct.price).toBe('number');
  expect(typeof firstProduct.stock).toBe('number');

  console.log(`✓ Producto: "${firstProduct.title}" - Precio: $${firstProduct.price}, Stock: ${firstProduct.stock}`);
});

// Cleanup después de todos los escenarios
After(async function () {
  if (apiContext) {
    await apiContext.dispose();
  }
});

import { After } from '@cucumber/cucumber';
