// src/islands/Login.tsx
import { Link } from "honox/server";

export default function Login() {
  return (
    <header class="p-4 bg-gray-200 flex justify-between">
      <h1 class="font-bold">MyApp</h1>
      <Link
        href="/oauth/authorize"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login with ahm
      </Link>
    </header>
  );
}
