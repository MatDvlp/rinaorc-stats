export class RequestManager {
  private static token: string | number = 'Your token';

  public static getToken() {
    return this.token;
  }

  public static setToken(token: string | number): void {
    this.token = token;
  }
}
