import { useState } from "hono/jsx";

export default function Login() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Redirect user to backend route for authorization
      window.location.href = "/oauth/authorize";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header class={"kj"}>
      <button
        onClick={handleLogin}
        class="px-4 py-2 bg-orange-400 text-white rounded cursor-pointer"
      ></button>
    </header>
  );
}
