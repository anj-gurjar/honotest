import { createRoute } from "honox/factory";
import Login from "../islands/login";
import { getCookie, setCookie } from "hono/cookie";

export default createRoute((c) => {
  const accessToken = getCookie(c, "access_token");

  if (!accessToken) {
    return c.render(<Login />);
  }

  return c.render(
    <main class="py-12 text-center bg-gray-50 min-h-screen">
      <h2 class="text-4xl font-bold text-gray-800">Main Content (Logged In)</h2>
    </main>
  );
});
