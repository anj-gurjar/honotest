export async function genChallenge() {
  const verifier = genCodeVerifier();
  const challenge = await genCodeChallenge(verifier);
  return { verifier, challenge, method: "S256" };
}

function genCodeVerifier(): string {
  const array = new Uint8Array(128);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    return chars[byte % chars.length];
  }).join("");
}

async function genCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const base64url = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return base64url;
}
