import { createRoute } from "honox/factory";
import { getCookie } from "hono/cookie";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Mood } from "../islands/mood";

export default createRoute((c) => {
  const accessToken = getCookie(c, "access_token");

  // अगर login नहीं है → सीधे login page पर redirect
  if (!accessToken) {
    return c.redirect(new URL("/login", c.req.url).toString());
  }

  const moods = ["Sad", "Happy", "Motivation"];
  return c.render(
    <div>
      <Header c={c} />
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
