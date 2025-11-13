// src/screenplay/actors/Actor.ts

/**
 * src/screenplay/actors/Actor.ts
 * Representa al actor (usuario) que ejecuta acciones dentro del framework Screenplay.
 * El Actor puede tener "habilidades" (abilities) como usar el navegador, llamar APIs, etc.
 */

export class Actor {
  private abilities: Map<string, any> = new Map();

  constructor(public name: string) {}

  /**
   * Permite otorgar una habilidad al Actor.
   * Ejemplo: actor.can(UseBrowser.with(page));
   */
  can(ability: any): this {
    this.abilities.set(ability.constructor.name, ability);
    return this;
  }

  /**
   * Permite recuperar una habilidad previamente otorgada.
   * Ejemplo: actor.abilityTo(UseBrowser).page;
   */
  abilityTo<T>(abilityType: new (...args: any[]) => T): T {
    const ability = this.abilities.get(abilityType.name);
    if (!ability) {
      throw new Error(
        `El actor ${this.name} no tiene la habilidad requerida: ${abilityType.name}`
      );
    }
    return ability as T;
  }

  /**
   * Verifica si el actor tiene una habilidad específica.
   */
  hasAbility(abilityType: new (...args: any[]) => any): boolean {
    return this.abilities.has(abilityType.name);
  }
}

