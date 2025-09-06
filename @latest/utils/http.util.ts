import { getCookie, setCookie, deleteCookie, type Cookie } from "hono/cookie";
import type { Context } from "hono";

class CookieHandler {
  readonly name: string;

  constructor(name: string, public options: Omit<Cookie, "name" | "value">) {
    this.name = name;
  }

  set(c: Context, value: string): void {
    setCookie(c, this.name, value, this.options);
  }

  get(c: Context): string | undefined {
    return getCookie(c, this.name);
  }

  delete(c: Context): void {
    deleteCookie(c, this.name, this.options);
  }
}

// Instances
export const accessTokenCookie = new CookieHandler("ACCESS_TOKEN", {
  httpOnly: true,
  secure: false,
  sameSite: "Strict",
  path: "/",
});
