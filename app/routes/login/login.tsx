import { Context } from "hono";
import { getCookie } from "hono/cookie";
import { useState } from "hono/jsx";

export default function GET(c: Context) {
  const [logoin, setLogin] = useState("");

  const token = c.get("accesstoken");

  if (token) {
    setLogin(token);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    
      <h1 className="text-3xl font-bold mb-6">Music All</h1>
      <a
        href="/oauth/authorize"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Login
      </a>
    </div>
  );
}
