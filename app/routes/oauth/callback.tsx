// callback-handler.ts
import type { Context } from "hono";

export const callbackHandler = async (c: Context) => {
  try {
    const url = new URL(c.req.url);
    const params = url.searchParams;

    const codeChallengeKey = params.get("state");
    const authCode = params.get("code");

    if (!authCode || !codeChallengeKey) {
      return c.text("Missing code or state", 400);
    }

    // Retrieve code_verifier from server storage
    const codeVerifier = c.env.CODE_VERIFIER_STORE.get(codeChallengeKey);
    if (!codeVerifier) {
      return c.text("Invalid or expired state", 400);
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      client_id: process.env.AUTH_CLIENT_ID!,
      client_secret: process.env.AUTH_CLIENT_SECRET!,
      redirect_uri: `${"http://localhost:3000"}/AUTH/callback`,
      code_verifier: codeVerifier,
    });

    const res = await fetch(process.env.AUTH_TOKEN_URL!, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    console.log("AUThß token response:", data);
    console.log("Decoded ID Token:");

    return c.json({ data });
  } catch (err) {
    console.error("Callback error:", err);
    return c.text("Error during callback", 500);
  }
};
