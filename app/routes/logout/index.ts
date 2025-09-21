import { Context } from "hono";
import {
  accessTokenCookie,
  idTokenCookie,
  refreshTokenCookie,
} from "../../../utils/http.util";
import { comresult } from "../../../utils/open-id.util";

export default async function GET(c: Context) {
  try {
    const refressToken = refreshTokenCookie.get(c);
    console.log(refressToken);

    if (!refressToken) {
      return c.redirect("/oauth/authorize");
    }

    if (!comresult.revocation_endpoint) {
      console.error("Revocation endpoint not defined");
      return c.redirect("/");
    }

    async (token: string) => {
      try {
        const res = await fetch(comresult.revocation_endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            token_type_hint: "access_token | refress_token",
          }),
        });
        if (!res.ok) {
          console.error("Token revocation failed", await res.text());
        }
      } catch (err) {
        console.error("Fetch to revocation endpoint failed:", err);
      }
    };

    // const scheme = c.req.header("x-forwarded-proto") || "http";
    // const host = c.req.header("host") || "localhost:5173";
    // const baseUrl = `${scheme}://${host}`;
    const callbackUrl = new URL(c.req.url);
    callbackUrl.pathname += "/callback";

    if (!comresult.end_session_endpoint) {
      console.error("End session endpoint not defined");
      return c.redirect("/");
    }

    const endSessionUrl = new URL(comresult.end_session_endpoint);
    endSessionUrl.searchParams.set(
      "post_logout_redirect_uri",
      callbackUrl.toString()
    );

    const idToken = idTokenCookie.get(c);
    if (idToken) {
      endSessionUrl.searchParams.set("id_token_hint", idToken);
    }

    accessTokenCookie.delete(c);
    idTokenCookie.delete(c);
    refreshTokenCookie.delete(c);

    if (c.res.ok) {
      return c.redirect("/");
    }
  } catch (err) {
    console.error("Logout failed:", err);
    return c.redirect("/oauth/authorize");
  }
}
