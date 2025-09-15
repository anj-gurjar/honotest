import { getCookie } from "hono/cookie";
import type { Context } from "hono";
import { useEffect, useState } from "hono/jsx";

interface HeaderProps {
  accessToken?: string | null;
}

export function Header({ accessToken }: HeaderProps) {
  const isLoggedIn = !!accessToken;

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">MyApp</h1>

      {isLoggedIn ? (
        <a
          href="/logout/callback"
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
        >
          Logout
        </a>
      ) : (
        <a
          href="/oauth/authorize"
          className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
        >
          Login
        </a>
      )}
    </header>
  );
}
