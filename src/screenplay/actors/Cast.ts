// src/screenplay/actors/Cast.ts

import { Actor } from './Actor';

/**
 * El Cast (reparto) es responsable de crear actores para cada escenario de prueba.
 * Aquí puedes configurar cómo se crean los actores y con qué nombre.
 */
export class Cast {
  /**
   * Crea un nuevo actor con el nombre indicado.
   * @param name Nombre del actor (ej: "Usuario Web", "Tester", etc.)
   */
  actorCalled(name: string): Actor {
    return new Actor(name);
  }
}
