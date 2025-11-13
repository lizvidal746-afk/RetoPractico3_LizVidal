// src/support/world.ts

/**
 * src/support/world.ts
 * Este archivo conecta Cucumber con Screenplay.
 * Aquí se almacena el "mundo" del escenario: el actor y datos compartidos.
 */

import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Actor } from '../screenplay/actors/Actor';
import { Cast } from '../screenplay/actors/Cast';

export class ScreenplayWorld extends World {
  public actor!: Actor;
  private cast: Cast;
  public sharedData: Map<string, any> = new Map();

  constructor(options: IWorldOptions) {
    super(options);
    this.cast = new Cast();
  }

  /**
   * Crea y retorna el actor para este escenario.
   * Si ya existe, lo devuelve sin volver a crearlo.
   */
  theActor(name: string = 'Usuario Web'): Actor {
    if (!this.actor) {
      this.actor = this.cast.actorCalled(name);
    }
    return this.actor;
  }

  /**
   * Almacena datos compartidos entre steps de un escenario.
   */
  setData(key: string, value: any): void {
    this.sharedData.set(key, value);
  }

  /**
   * Recupera datos compartidos entre steps.
   */
  getData(key: string): any {
    return this.sharedData.get(key);
  }

  /**
   * Limpia los datos compartidos después del escenario.
   */
  clearData(): void {
    this.sharedData.clear();
  }
}

// Registramos este World para que Cucumber lo utilice.
setWorldConstructor(ScreenplayWorld);
