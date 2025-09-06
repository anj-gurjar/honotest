import { getCookie, setCookie, deleteCookie } from "hono/cookie";
class CookieHandler {
    options;
    name;
    constructor(name, options) {
        this.options = options;
        this.name = name;
    }
    set(c, value) {
        setCookie(c, this.name, value, this.options);
    }
    get(c) {
        return getCookie(c, this.name);
    }
    delete(c) {
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
