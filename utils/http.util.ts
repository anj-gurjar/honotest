import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { Context } from "hono";

class CookieHandler {
  constructor(
    public name: string,
    public options: {
      path?: string;
      domain?: string;
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "Strict" | "Lax" | "None";
      maxAge?: number;
      expires?: Date;
    }
  ) {}

  set(c: Context, value: string): void {
    setCookie(c, this.name, value, this.options);
  }

  get(c: Context): string | undefined {
    return getCookie(c, this.name);
  }

  delete(c: Context): void {
    const options = { ...this.options };
    delete options.maxAge;
    delete options.expires;
    deleteCookie(c, this.name, options);
  }
}

export const accessTokenCookie = new CookieHandler("ACCESS_TOKEN", {
  sameSite: "Strict",
  httpOnly: true,
  secure: false,
  path: "/",
});

export const refreshTokenCookie = new CookieHandler("REFRESH_TOKEN", {
  sameSite: "Strict",
  httpOnly: true,
  secure: false,
  path: "/",
});

export const idTokenCookie = new CookieHandler("ID_TOKEN", {
  sameSite: "Strict",
  httpOnly: true,
  secure: false,
  path: "/logout",
});
