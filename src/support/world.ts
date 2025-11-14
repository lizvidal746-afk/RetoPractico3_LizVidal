// src/support/world.ts

const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { Actor: ActorClass } = require('../screenplay/actors/Actor');
const { Cast: CastClass } = require('../screenplay/actors/Cast');

class ScreenplayWorldImpl extends World {
  actor: any;
  cast: any;
  sharedData: any;

  constructor(options: any) {
    super(options);
    this.actor = null;
    this.cast = new CastClass();
    this.sharedData = new Map();
  }

  theActor(name: string = 'Usuario Web') {
    if (!this.actor) {
      this.actor = this.cast.actorCalled(name);
    }
    return this.actor;
  }

  setData(key: any, value: any) {
    this.sharedData.set(key, value);
  }

  getData(key: any) {
    return this.sharedData.get(key);
  }

  clearData() {
    this.sharedData.clear();
  }
}

setWorldConstructor(ScreenplayWorldImpl);
module.exports = { ScreenplayWorld: ScreenplayWorldImpl };
