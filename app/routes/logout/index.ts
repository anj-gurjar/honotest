import { Context } from "hono";
import {
  accessTokenCookie,
  idTokenCookie,
  refreshTokenCookie,
} from "../../../utils/http.util";
import { comresult } from "../../../utils/open-id.util";

export default async function GET(c: Context) {
  try {
    const accessToken = accessTokenCookie.get(c);
    console.log(accessToken);
    if (!accessToken) {
      return Response.redirect("/oauth/authorize");
    }

    if (!comresult.revocation_endpoint) {
      console.error("Revocation endpoint not defined");
      return c.redirect("/");
    }

    try {
      const res = await fetch(comresult.revocation_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: accessToken,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          token_type_hint: "access_token",
        }),
      });

      if (!res.ok) {
        console.error("Token revocation failed", await res.text());
      }
    } catch (err) {
      console.error("Fetch to revocation endpoint failed:", err);
    }

    const callbackUrl = new URL(c.req.url);
    callbackUrl.pathname += "/callback";

    if (!comresult.end_session_endpoint) {
      console.error("End session endpoint not defined");
      return c.redirect("/oauth/authorize");
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

    // accessTokenCookie.delete(c);
    // idTokenCookie.delete(c);
    // refreshTokenCookie.delete(c);

    // return c.redirect(endSessionUrl.toString());

    return c.redirect("/login");
  } catch (err) {
    console.error("Logout failed:", err);
    return c.redirect("/oauth/authorize");
  }
}
