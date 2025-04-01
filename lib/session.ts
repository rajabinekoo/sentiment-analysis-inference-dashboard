export class Session {
  private token: string | null;

  constructor() {
    this.token = window.localStorage.getItem(
      process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME as string,
    );
  }

  public getToken() {
    return this.token;
  }

  public setToken(_token: string) {
    this.token = _token;
    window.localStorage.setItem(
      process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME as string,
      _token,
    );
  }

  public logout() {
    this.token = null;
    window.localStorage.removeItem(
      process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME as string,
    );
  }
}
