import { defineConfig } from "drizzle-kit";

process.loadEnvFile(".env");

export default defineConfig({
  schema: "./app/core/**/*.schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
