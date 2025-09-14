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
    "private_key_jwt"
  ];
  introspection_endpoint_auth_signing_alg_values_supported: ["RS256"];
  revocation_endpoint_auth_methods_supported: ["client_secret_basic"];
  revocation_endpoint_auth_signing_alg_values_supported: ["RS256"];
  response_types_supported: ["code", "token", "id_token"];
  subject_types_supported: ["public"];
  id_token_signing_alg_values_supported: ["RS256"];
  scopes_supported: ["openid", "email", "phone", "profile", "address"];
  grant_types_supported: ["authorization_code", "refresh_token"];
  code_challenge_methods_supported: ["S256"];
}

interface Jwks {
  keys: (JsonWebKey & { kid: string })[];
}

// 1️⃣ Fetch OIDC configuration safely
let _result: Response;
try {
  if (!process.env.AHAM_AUTH_URL) {
    throw new Error("AHAM_AUTH_URL is not defined");
  }
  _result = await fetch(
    `${process.env.AHAM_AUTH_URL}/.well-known/openid-configuration`
  );
  if (!_result.ok) {
    throw new Error(
      `Failed to fetch OIDC config: ${_result.status} ${_result.statusText}`
    );
  }
} catch (err) {
  console.error("Fetch failed for OIDC configuration:", err);
  throw err;
}

// 2️⃣ Parse config
export const comresult: Config = await _result.json();

// 3️⃣ Fetch JWKS safely
let _jwksRes: Response;
try {
  if (!comresult.jwks_uri) {
    throw new Error("JWKS URI is missing in OIDC config");
  }
  _jwksRes = await fetch(comresult.jwks_uri);
  if (!_jwksRes.ok) {
    throw new Error(
      `Failed to fetch JWKS: ${_jwksRes.status} ${_jwksRes.statusText}`
    );
  }
} catch (err) {
  console.error("Fetch failed for JWKS URI:", err);
  throw err;
}

// 4️⃣ Parse JWKS
export const jwks: Jwks = await _jwksRes.json();

// 5️⃣ Extract keys
export const idTokenKey = jwks.keys.find(
  (key) => key.kid === process.env.ID_TOKEN_KID
);
console.log(idTokenKey);
export const accessTokenKey = jwks.keys.find(
  (key) => key.kid === process.env.ACCESS_TOKEN_KID
);


if (!idTokenKey) {
  console.warn("ID Token Key not found for the given ID_TOKEN_KID");
}

if (!accessTokenKey) {
  console.warn("Access Token Key not found for the given ACCESS_TOKEN_KID");
}
