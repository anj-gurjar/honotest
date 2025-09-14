import { verify } from "jsonwebtoken";
import { accessTokenKey, idTokenKey } from "./open-id.util";

interface Payload {
  token: string;
}
export const verifyIdToken = (token: string): Payload => {
  return verify(token, idTokenKey as any) as Payload;
};
export const verifyAccessToken = (token: string): Payload => {
  return verify(token, accessTokenKey as any) as Payload;
};
