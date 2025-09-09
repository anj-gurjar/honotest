// src/routes/oauth/authorize.tsx
import { createRoute } from "honox/factory";
import { getConfig } from "../../../utils/open-id.util";
import { genChallenge } from "../../../utils/challenge.util";
export default createRoute(async (c) => {
  const cfg = await getConfig();

  const { challenge, verifier, method } = await genChallenge();
  const state = crypto.randomUUID();

  // Save verifier in memory/session (demo only)
  c.env.CODE_VERIFIER_STORE.set(state, verifier);

  const authUrl = new URL(cfg.authorization_endpoint);
  authUrl.searchParams.set("client_id", process.env.CLIENT_ID!);
  authUrl.searchParams.set(
    "redirect_uri",
    "http://localhost:5173/oauth/callback"
  );
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid profile email");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", challenge);
  authUrl.searchParams.set("code_challenge_method", method);

  return c.redirect(authUrl.toString());
});
