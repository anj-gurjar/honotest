import { Hono } from "hono";

const router = new Hono();

router.get("/authorize", (c) => {
  const url = new URL(c.req.url);
  return Response.redirect(url.toString());
});
