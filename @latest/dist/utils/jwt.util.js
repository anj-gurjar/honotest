import { jwtVerify, importJWK, JWTPayload } from 'jose';
import { accessTokenKey, idTokenKey } from './open-id.util.ts';
// Convert JWK to CryptoKey
const idTokenPubKey = await importJWK(idTokenKey, 'RS256');
const accessTokenPubKey = await importJWK(accessTokenKey, 'RS256');
// Verify ID Token
export const verifyIdToken = async (token) => {
    const { payload } = await jwtVerify(token, idTokenPubKey);
    return payload;
};
// Verify Access Token
export const verifyAccessToken = async (token) => {
    const { payload } = await jwtVerify(token, accessTokenPubKey);
    return payload;
};
