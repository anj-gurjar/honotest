import build from "@hono/vite-build/node";
import adapter from "@hono/vite-dev-server/node";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

process.loadEnvFile(".env");

export default defineConfig({
  server: { port: +process.env.PORT! },
  plugins: [
    honox({
      devServer: { adapter },
      client: { input: ["./app/style.css"] },
      external: ["pg"],
    }),
    tailwindcss(),
    build(),
  ],
});
