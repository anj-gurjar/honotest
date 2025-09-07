import { useState } from 'hono/jsx'

export default function Counter() {
  const [auth, setAuth] = useState(0)
  return (
    <div>
      <p class="py-2 text-2xl">{auth}</p>
      <button
        class="px-4 py-2 bg-orange-400 text-white rounded cursor-pointer"
        onClick={() => setAuth(0)}
      >
        Login
      </button>
    </div>
  )
}
