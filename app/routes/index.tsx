import { createRoute } from "honox/factory";
import { accessTokenCookie } from "../../utils/http.util";

import { Header } from "../components/Header";
import { Context } from "hono";

export const handler = async (c: Context) => {
  const cookie = accessTokenCookie.get(c);
  if (cookie) {
  }
};

export default createRoute((c) => {
  return c.render(
    <div>
      <Header login />

      <main></main>
    </div>
  );
});
