/**
 * src/screenplay/abilities/CallAPI.ts
 * Habilidad que permite al actor realizar llamadas HTTP a una API.
 */

class CallAPI {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.token = undefined;
  }

  static with(apiContext) {
    return new CallAPI(apiContext);
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}

module.exports = { CallAPI };
