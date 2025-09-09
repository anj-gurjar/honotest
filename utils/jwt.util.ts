import jwt, { JwtPayload } from "jsonwebtoken";
import jwkToPem, { JWK } from "jwk-to-pem";
import { getIdTokenKey, getAccessTokenKey, Jwk } from "./open-id.util";

export async function verifyIdToken(token: string): Promise<JwtPayload> {
  const jwk = await getIdTokenKey();
  if (!jwk) throw new Error("ID Token key not found");

  const idpem = jwkToPem(jwk as unknown as JWK);
  return jwt.verify(token, idpem, { algorithms: ["RS256"] }) as JwtPayload;
}

export async function verifyAccessToken(token: string): Promise<JwtPayload> {
  const jwk = await getAccessTokenKey();
  if (!jwk) throw new Error("Access Token key not found");

  const accespem = jwkToPem(jwk as unknown as JWK);
  return jwt.verify(token, accespem, { algorithms: ["RS256"] }) as JwtPayload;
}
