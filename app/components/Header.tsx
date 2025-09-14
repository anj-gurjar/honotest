import { getCookie } from "hono/cookie";
import type { Context } from "hono";

interface HeaderProps {
  c?: Context; // अगर server-side render कर रहे हो तो context से token निकाल सकते हो
}

export function Header({ c }: HeaderProps) {
  let isLoggedIn = false;

  // अगर SSR context है → cookie check कर लो
  if (c) {
    const token = getCookie(c, "access_token");
    isLoggedIn = !!token;
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">MyApp</h1>

      {isLoggedIn ? (
        <a
          href="/logout"
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
        >
          Logout
        </a>
      ) : (
        <a
          href="/login"
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
        >
          Login
        </a>
      )}
    </header>
  );
}
