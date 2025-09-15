import { createRoute } from "honox/factory";
import { getCookie } from "hono/cookie";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Mood } from "../islands/mood";

export default createRoute((c) => {
  const accessToken = getCookie(c, "access_token");

  if (!accessToken) {
    c.html(
      ` <div className="flex flex-col items-center justify-center min-h-screen">
    
      <h1 className="text-3xl font-bold mb-6">Music All</h1>
      <a
        href="/oauth/authorize"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Login
      </a>
    </div>`
    );
  }

  const moods = ["Sad", "Happy", "Motivation"];
  return c.render(
    <div>
      <Header accessToken={accessToken} />
      <section className="text-center mt-10">
        <h1 className="text-3xl font-bold">What is Going On Your Mood?</h1>
        <p className="mt-2 text-gray-600">
          Welcome to MyApp — track your habits, improve your life, and stay
          connected.
        </p>

        <div className="mt-6">
          <Mood data={moods} />
        </div>
      </section>
      <Footer />
    </div>
  );
});
