import { useState } from "hono/jsx";

import { ProfileIcon } from "./profile";
import { SearchBar } from "../islands/searchbar";

interface HeaderProps {
  accessToken?: string | null;
}

export function Header({ accessToken }: HeaderProps) {
  const isLoggedIn = !!accessToken;
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <header class="flex justify-between items-center p-4 bg-blue-800 text-white">
      {/* App Title */}
      <h1 class="text-xl font-bold">MyApp</h1>

      {/* Show profile icon only when logged in */}
      {isLoggedIn && (
        <div class="backdrop-blur-3xl border-2 border-white rounded-full p-2 bg-gradient-radial from-blue-600 to-blue-900">
          <ProfileIcon class="text-green-200" />
        </div>
      )}

      {/* Search bar */}
      <SearchBar />

      {/* Auth button */}
      {isLoggedIn ? (
        <a
          href="/logout/callback"
          class="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
        >
          Logout
        </a>
      ) : (
        <a
          href="/oauth/authorize"
          class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700"
        >
          Login
        </a>
      )}
    </header>
  );
}
