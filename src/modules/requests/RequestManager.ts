export class RequestManager {
  private static token: string | number = ''; // More informations at https://api.rinaorc.com

  public static getToken() {
    return this.token;
  }

  public static setToken(token: string | number): void {
    this.token = token;
  }
}
