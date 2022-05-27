export class RequestManager {
  private static token: string | number = '652d5556-f4e2-4ce5-8f0f-16504add7a8e';

  public static getToken() {
    return this.token;
  }

  public static setToken(token: string | number): void {
    this.token = token;
  }
}
