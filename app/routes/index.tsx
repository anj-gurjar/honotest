import { createRoute } from "honox/factory";
import Login from "../islands/login";
import { getCookie, setCookie } from "hono/cookie";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Mood } from "../islands/mood";

export default createRoute((c) => {
  const accessToken = getCookie(c, "access_token");

  if (!accessToken) {
    return c.render(<Login />);
  }
  const moods = ["Sad", "Happy"];
  return c.render(
    <div>
      <Header login />
      <section className="text-center mt-10">
        <h1 className="text-3xl font-bold">What is Going On Your Mood?</h1>
        <p className="mt-2 text-gray-600">
          Welcome to MyApp — track your habits, improve your life, and stay
          connected.
        </p>

        {/* Mood Selector */}
        <div className="mt-6">
          <Mood data={moods} />
        </div>
      </section>
      <Footer />
    </div>
  );
});
