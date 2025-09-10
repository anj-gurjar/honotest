// src/routes/oauth/authorize.ts
import { createRoute } from "honox/factory";

export const authorizeRoute = createRoute(async (c) => {
  const authUrl = new URL(`${process.env.AHAM_AUTH_URL}/authorize`);

  // Set query parameters
  authUrl.searchParams.set("client_id", process.env.CLIENT_ID!);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", process.env.REDIRECT_URI!);
  authUrl.searchParams.set("scope", "openid email profile");

  return c.redirect(authUrl.toString());
});
