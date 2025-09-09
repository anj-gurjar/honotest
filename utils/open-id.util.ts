export interface Config {
  issuer: string;
  jwks_uri: string;
  authorization_endpoint: string;
  token_endpoint: string;
  userinfo_endpoint?: string;
}

export interface Jwk {
  kid: string;
  use: string;
  alg: string;
  kty: string;
  n: string;
  e: string;
}

export interface Jwks {
  keys: Jwk[];
}

let config: Config | null = null;
let jwks: Jwks | null = null;

export async function getConfig(): Promise<Config> {
  if (!config) {
    const discoveryRes = await fetch(
      `${process.env.AHAM_AUTH_URL}/.well-known/openid-configuration`
    );
    config = (await discoveryRes.json()) as Config;
  }
  return config;
}

export async function getJwks(): Promise<Jwks> {
  if (!jwks) {
    const cfg = await getConfig();
    const jwksRes = await fetch(cfg.jwks_uri);
    jwks = (await jwksRes.json()) as Jwks;
  }
  return jwks;
}

export async function getIdTokenKey(): Promise<Jwk | undefined> {
  const jwks = await getJwks();
  return jwks.keys.find((k) => k.use === "sig");
}

export async function getAccessTokenKey(): Promise<Jwk | undefined> {
  const jwks = await getJwks();
  return jwks.keys.find((k) => k.use === "sig");
}
