// auth-handler.ts
import { genChallenge } from "../../../utils/challenge.util.js";
import type { Context } from "hono";

export const authHandler = async (c: Context) => {
  try {
    const authUrl = new URL(process.env.AHAM_AUTH_URL!);
    authUrl.searchParams.set("client_id", process.env.AHAM_CLIENT_ID!);
    authUrl.searchParams.set(
      "redirect_uri",
      `${"http://localhost:8081"}/oauth/callback`
    );
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid profile email");
    authUrl.searchParams.set("access_type", "offline");

    // Handle Code Challenge
    const codeChallengeKey = crypto.randomUUID();
    const code = await genChallenge();

    c.env.CODE_VERIFIER_STORE.set(codeChallengeKey, code.verifier);

    authUrl.searchParams.set("state", codeChallengeKey); // CSRF protection
    authUrl.searchParams.set("code_challenge", code.challenge);
    authUrl.searchParams.set("code_challenge_method", code.method);

    return c.redirect(authUrl.toString());
  } catch (err) {
    console.error("Auth Handler error:", err);
    return c.text("Error initiating OAuth", 500);
  }
};
