import * as jose from "jose";
import { getJwkByKid } from "../utils/open-id.util";

export async function verifyToken(token: string) {
  const { payload, protectedHeader } = jose.decodeJwt(token);
  const kid = (protectedHeader as any).kid;

  const jwk = await getJwkByKid(kid);
  if (!jwk) throw new Error("No matching JWK found");

  const key = await jose.importJWK(jwk, jwk.alg);

  return await jose.jwtVerify(token, key, {
    algorithms: ["RS256"],
  });
}
