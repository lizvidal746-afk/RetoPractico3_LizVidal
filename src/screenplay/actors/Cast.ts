// src/screenplay/actors/Cast.ts

const { Actor } = require('./Actor');

/**
 * El Cast (reparto) es responsable de crear actores para cada escenario de prueba.
 * Aquí puedes configurar cómo se crean los actores y con qué nombre.
 */
class Cast {
  actorCalled(name) {
    return new Actor(name);
  }
}

module.exports = { Cast };
