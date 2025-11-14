// src/support/world.ts

const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { Actor } = require('../screenplay/actors/Actor');
const { Cast } = require('../screenplay/actors/Cast');

class ScreenplayWorld extends World {
  constructor(options) {
    super(options);
    this.actor = null;
    this.cast = new Cast();
    this.sharedData = new Map();
  }

  theActor(name = 'Usuario Web') {
    if (!this.actor) {
      this.actor = this.cast.actorCalled(name);
    }
    return this.actor;
  }

  setData(key, value) {
    this.sharedData.set(key, value);
  }

  getData(key) {
    return this.sharedData.get(key);
  }

  clearData() {
    this.sharedData.clear();
  }
}

setWorldConstructor(ScreenplayWorld);
module.exports = { ScreenplayWorld };
setWorldConstructor(ScreenplayWorld);
