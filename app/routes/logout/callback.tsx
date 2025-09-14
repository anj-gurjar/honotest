import { Context } from "hono";
import {
  accessTokenCookie,
  refreshTokenCookie,
} from "../../../utils/http.util";

export default function GET(c: Context) {
  accessTokenCookie.delete(c);
  refreshTokenCookie.delete(c);
  const authurl = new URL(c.req.url);
  authurl.pathname += "/oauth/authorize";
  c.set("Location", c.header);
  return c.json({ status: 200 });
}
