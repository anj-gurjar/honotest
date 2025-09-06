import { genChallenge } from "./../utils/challenge.util.ts";
import { define } from "../utils/router.util.ts";

// In-memory store for demo (replace with Redis/DB in production)
const pkceStore = new Map<string, string>();

export const handler = define.handlers(async (c) => {
  const authUrl = new URL(process.env.AHAM_AUTH_URL!);

  // PKCE code verifier & challenge
  const code = await genChallenge();

  // State used to map verifier later
  const state = crypto.randomUUID();
  pkceStore.set(state, code.verifier);

  // Auth params
  authUrl.searchParams.set("client_id", process.env.AHAM_CLIENT_ID!);
  authUrl.searchParams.set(
    "redirect_uri",
    "http://localhost:8081/aham/callback"
  );
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid profile email");
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("state", state); // CSRF protection
  authUrl.searchParams.set("code_challenge", code.challenge);
  authUrl.searchParams.set("code_challenge_method", code.method);

  return c.redirect(authUrl.toString());
});

// later in callback.ts you’ll retrieve & exchange:
export function getVerifier(state: string): string | undefined {
  return pkceStore.get(state);
}




import { decodeIdToken } from "@utils/jwt.util.ts";
import { define } from "@utils/router.util.ts";

interface CallbackResult {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: "Bearer";
  scope: string;
}

export const handler = define.handlers(async ({ url }) => {
  try {
    const params = url.searchParams;
    const codeChallengeKey = params.get("state")!;
    const authCode = params.get("code");

    if (!authCode) {
      return new Response("Missing authorization code", { status: 400 });
    }

    
    const codeVerifier = "lookup_from_storage_with_" + codeChallengeKey;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `http://localhost:3000/google/callback`,
      code_verifier: codeVerifier,
    });

    const res = await fetch(process.env.GOOGLE_TOKEN_URL!, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google token error:", errorText);
      return new Response("Failed to exchange token", { status: 500 });
    }

    const data: CallbackResult = await res.json();
    console.log("Google token response:", data);

    // Decode ID token
    const payload = decodeIdToken(data.id_token);
    console.log("Decoded payload:", payload);

    return Response.json({ data, payload });
  } catch (err) {
    console.error("Callback error:", err);
    return new Response("Internal server error", { status: 500 });
  }
});