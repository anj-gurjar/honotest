import { createRoute } from "honox/factory";
import { accessTokenCookie } from "../../utils/http.util";

import { Header } from "../components/Header";
import { Context } from "hono";

export const handler = async (c: Context) => {
  const cookie = accessTokenCookie.get(c);
  if (cookie) {
    console.log(cookie);
  }
};

export default createRoute((c) => {
  return c.render(
    <div>
      <Header login />

      <main class="py-12 text-center bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <h2 class="text-4xl font-bold text-gray-800">
          Share Food. Spread Happiness. 🌍
        </h2>
        <p class="mt-4 text-gray-700 max-w-2xl mx-auto text-lg">
          ShareBite is a movement to <b>reduce food waste</b> and deliver meals
          to <b>people in need</b>. With every order, you help fight hunger and
          create a lasting impact.
        </p>

        <div class="bg-gradient-to-r from-yellow-100 via-red-100 to-pink-100 p-8 rounded-xl shadow-lg mt-8 max-w-xl mx-auto relative overflow-hidden">
          <p class="text-center text-xl font-semibold relative z-10">
            🌟 "Eat with Purpose" – Every meal counts! 🌟
          </p>

          <div class="absolute top-2 left-1/3 animate-float">
            <span class="text-2xl">💖</span>
          </div>
          <div class="absolute top-10 left-2/3 animate-float animation-delay-200">
            <span class="text-2xl">🍲</span>
          </div>
          <div class="absolute top-20 left-1/4 animate-float animation-delay-400">
            <span class="text-2xl">🤝</span>
          </div>
        </div>

        <div class="mt-12"></div>
      </main>
    </div>
  );
});
