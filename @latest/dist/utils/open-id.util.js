const _config = await fetch(`${process.env.AHAM_AUTH_DOMAIN}/.well-known/openid-configuration`);
export const config = await _config.json();
console.info(config);
const _jwks = await fetch(config.jwks_uri);
export const jwks = await _jwks.json();
// console.log(jwks);
export const idTokenKey = jwks.keys.find((key) => key.kid === process.env.ID_TOKEN_KID);
export const accessTokenKey = jwks.keys.find((key) => key.kid === process.env.ACCESS_TOKEN_KID);
