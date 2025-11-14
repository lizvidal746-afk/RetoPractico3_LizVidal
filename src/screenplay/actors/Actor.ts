// src/screenplay/actors/Actor.ts

/**
 * src/screenplay/actors/Actor.ts
 * Representa al actor (usuario) que ejecuta acciones dentro del framework Screenplay.
 * El Actor puede tener "habilidades" (abilities) como usar el navegador, llamar APIs, etc.
 */

class Actor {
  constructor(name) {
    this.name = name;
    this.abilities = new Map();
  }

  can(ability) {
    this.abilities.set(ability.constructor.name, ability);
    return this;
  }

  abilityTo(abilityType) {
    const ability = this.abilities.get(abilityType.name);
    if (!ability) {
      throw new Error(
        `El actor ${this.name} no tiene la habilidad requerida: ${abilityType.name}`
      );
    }
    return ability;
  }

  hasAbility(abilityType) {
    return this.abilities.has(abilityType.name);
  }
}

module.exports = { Actor };

