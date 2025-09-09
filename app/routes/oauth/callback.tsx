// src/routes/oauth/callback.tsx
import { createRoute } from "honox/factory";
import { getConfig } from "../../../utils/open-id.util";

export default createRoute(async (c) => {
  const url = new URL(c.req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) return c.text("Missing params", 400);

  const verifier = c.env.CODE_VERIFIER_STORE.get(state);
  if (!verifier) return c.text("Invalid state", 400);

  const cfg = await getConfig();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    redirect_uri: "http://localhost:5173/oauth/callback",
    code_verifier: verifier,
  });

  const res = await fetch(cfg.token_endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const tokens = await res.json();
  // Save tokens in cookie
  c.header(
    "Set-Cookie",
    `access_token=${tokens.access_token}; Path=/; HttpOnly`
  );

  return c.redirect("/me");
});
