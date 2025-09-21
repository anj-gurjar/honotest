import { getCookie } from "hono/cookie";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MusicIcon } from "../components/music";
import { Card } from "../islands/card";
import { Mood } from "../islands/mood";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  const accessToken = getCookie(c, "ACCESS_TOKEN");

  if (!accessToken) {
    return c.html(`
      <div class="flex flex-col items-center justify-center min-h-screen mt-9 ml-7">
        <h1 class="text-3xl text-center font-bold mb-6">Music All</h1>

        <div class='text-center flex justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M750-614q-27 27-62 41t-70 14q-35 0-69-13.5T488-614l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-689l-75 75-57-57 75-75q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-746l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-671l75-75 57 57-75 75Zm0 200q-27 27-61.5 40.5T619-360q-35 0-69.5-13.5T488-414l-75-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T267-489l-75 75-57-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-546l75 75q16 16 35 23.5t39 7.5q20 0 39.5-7.5T693-471l75-75 57 57-75 75Zm-1 200q-27 27-61 40.5T619-160q-35 0-69.5-13.5T488-214l-76-75q-15-15-34-22.5t-39-7.5q-20 0-39 7.5T266-289l-75 75-56-56 75-76q27-27 61-40.5t69-13.5q35 0 68.5 13.5T469-346l75 75q16 16 35.5 23.5T619-240q20 0 39-7.5t35-23.5l75-75 56 57-75 75Z"/></svg></div>
        <a
          href="/oauth/authorize"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </a>
      </div>
    `);
  }

  const moods = ["Sad", "Happy", "Motivation"];

  return c.render(
    <div>
      <Header accessToken={accessToken} />

      <section class="text-center mt-1">
        <h1 class="text-3xl font-bold">Music</h1>
        <p class="mt-2 text-gray-600">
          Welcome to MyApp — track your habits, improve your life, and stay
          connected.
        </p>

        <MusicIcon />

        <div class="mt-2">
          <Mood data={moods} />
        </div>

        <Card class="mt-1.5" />
      </section>

      <Footer />
    </div>
  );
});
