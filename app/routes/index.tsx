import { createRoute } from "honox/factory";
import { accessTokenCookie } from "../../utils/http.util";
import { Header } from "../components/Header";

export const GET = createRoute((c) => {
  const accessToken = accessTokenCookie.get(c);
  return c.json({ login: !!accessToken });
});

export default createRoute((c) => {
  const accessToken = accessTokenCookie.get(c);

  return c.render(
    <>
      <Header login={!!accessToken} />
      <main class="py-12 text-center bg-gray-50 min-h-screen">
        <h2 class="text-4xl font-bold text-gray-800">Main Content</h2>
      </main>
    </>
  );
});
