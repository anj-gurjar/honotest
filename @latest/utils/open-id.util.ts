const _config = await fetch(
  `${process.env.AHAM_AUTH_DOMAIN}/.well-known/openid-configuration`

);

interface Config {
  issuer: string;
  jwks_uri: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  authorization_endpoint: string;
  end_session_endpoint: string;
  check_session_iframe: string;
  revocation_endpoint: string;
  introspection_endpoint: string;
  device_authorization_endpoint: string;
  registration_endpoint: string;
  token_introspection_endpoint: string;
  introspection_endpoint_auth_methods_supported: [
    "client_secret_basic",
    "client_secret_post",
    "client_secret_jwt",
    "private_key_jwt",
  ];
  introspection_endpoint_auth_signing_alg_values_supported: ["RS256"];
  revocation_endpoint_auth_methods_supported: ["client_secret_basic"];
  revocation_endpoint_auth_signing_alg_values_supported: ["RS256"];
  response_types_supported: ("code" | "token" | "id_token")[];
  subject_types_supported: "public"[];
  id_token_signing_alg_values_supported: "RS256"[];
  scopes_supported:
    ("openid" | "email" | "phone" | "profile" | "address" | "offline_access")[];
  grant_types_supported: ("authorization_code" | "refresh_token")[];
  code_challenge_methods_supported: "S256"[];
}

export const config: Config = await _config.json();

console.info(config);

const _jwks = await fetch(config.jwks_uri);

interface Jwks {
  keys: (JsonWebKey & { kid: string })[];
}

export const jwks: Jwks = await _jwks.json();

// console.log(jwks);

export const idTokenKey = jwks.keys.find((key) =>
  key.kid === process.env.ID_TOKEN_KID
)!;

export const accessTokenKey = jwks.keys.find((key) =>
  key.kid === process.env.ACCESS_TOKEN_KID
)!;
