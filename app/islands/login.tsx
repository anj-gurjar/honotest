// src/islands/Login.tsx
import { Link } from "honox/server";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export default function Login() {
  return (
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
          <select className="border rounded px-4 py-2">
            <option value="happy">😊 Happy</option>
            <option value="sad">😔 Sad</option>
            <option value="spiritual">🧘 Spiritual</option>
            <option value="excited">🎉 Excited</option>
            <option value="relaxed">😌 Relaxed</option>
          </select>
        </div>
      </section>
      <Footer />
    </div>
  );
}
