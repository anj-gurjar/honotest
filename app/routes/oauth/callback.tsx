// src/routes/oauth/callback.tsx
import { createRoute } from "honox/factory";
import { comresult } from "../../../utils/open-id.util";
import { findSecretByGUID } from "../../core/attempt/attempt.service";
import {
  idTokenCookie,
  accessTokenCookie,
  refreshTokenCookie,
} from "../../../utils/http.util";

interface TokenRes {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  id_token?: string;
  scope?: string;
}

export default createRoute(async (c) => {
  try {
    const url = new URL(c.req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) return c.text("Missing params", 400);

    const verifier = await findSecretByGUID(state);
    if (!verifier) return c.text("Invalid state", 400);

    const body = {
      grant_type: "authorization_code",
      code,
      client_id: process.env.CLIENT_ID!,
      client_secret: process.env.CLIENT_SECRET!,
      redirect_uri: "http://localhost:5173/oauth/callback",
      code_verifier: verifier,
    };

    const res = await fetch(comresult.token_endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log(body);

    if (!res.ok) {
      const text = await res.text();
      console.error("Token request failed:", text);
      return c.text("Token request failed", 500);
    }

    const result: TokenRes = await res.json();
    console.log("Token response:", result);

    idTokenCookie.set(c, result.id_token!);
    accessTokenCookie.set(c, result.access_token);
    console.log(accessTokenCookie);
    refreshTokenCookie.set(c, result.refresh_token);

    return c.redirect("/");
  } catch (err) {
    console.error("Callback error:", err);
    return c.text((err as Error).message, 500);
  }
});
