// src/routes/oauth/authorize.tsx
import { createRoute } from "honox/factory";

import { genChallenge } from "../../../utils/challenge.util";
import { comresult } from "../../../utils/open-id.util";
import { createAttempt } from "../../core/attempt/attempt.service";
export default createRoute(async (c) => {
  const { challenge, verifier, method } = await genChallenge();

  const authUrl = new URL(comresult.authorization_endpoint);
  authUrl.searchParams.set("client_id", process.env.CLIENT_ID!);
  authUrl.searchParams.set(
    "redirect_uri",
    "http://localhost:5173/oauth/callback"
  );
  const state = await createAttempt({ secret: verifier });
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid profile email");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", challenge);
  authUrl.searchParams.set("code_challenge_method", method);

  return c.redirect(authUrl.toString());
});
