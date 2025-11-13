/**
 * src/screenplay/abilities/CallAPI.ts
 * Habilidad que permite al actor realizar llamadas HTTP a una API.
 */

import { APIRequestContext } from 'playwright';

export class CallAPI {
  private token?: string;

  constructor(public apiContext: APIRequestContext) {}

  static with(apiContext: APIRequestContext): CallAPI {
    return new CallAPI(apiContext);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | undefined {
    return this.token;
  }
}
