import { decodeIdToken } from "./utils/jwt.util.ts";
import { define } from "./utils/router.util.ts";
export const handler = define.handlers(async ({ url }) => {
    try {
        const params = url.searchParams;
        const codeChallengeKey = params.get("state");
        const authCode = params.get("code");
        if (!authCode) {
            return new Response("Missing authorization code", { status: 400 });
        }
        // 🚨 Replace with a real lookup from server-side storage (Redis/DB/Memory)
        const codeVerifier = "lookup_from_storage_with_" + codeChallengeKey;
        const body = new URLSearchParams({
            grant_type: "authorization_code",
            code: authCode,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: `http://localhost:3000/google/callback`,
            code_verifier: codeVerifier,
        });
        const res = await fetch(process.env.GOOGLE_TOKEN_URL, {
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
        const data = await res.json();
        console.log("Google token response:", data);
        // Decode ID token
        const payload = decodeIdToken(data.id_token);
        console.log("Decoded payload:", payload);
        return Response.json({ data, payload });
    }
    catch (err) {
        console.error("Callback error:", err);
        return new Response("Internal server error", { status: 500 });
    }
});
