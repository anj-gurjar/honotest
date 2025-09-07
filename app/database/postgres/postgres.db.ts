import pg from "pg";

import { drizzle } from "drizzle-orm/node-postgres";
import { attemptsTable } from "../../core/attempt/attempt.schema";

// Create pool
export const client = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(client, {
  schema: {
    attemptsTable,
  },
});

export const connect = async () => {
  try {
    const conn = await client.connect();

    console.log("Database connected");
    conn.release();
  } catch (error) {
    console.error(' Failed to connect to DB", error');
  }
};

export const disconnect = async () => {
  try {
    await client.end();
    console.log(" Database disconnected");
  } catch (error) {
    console.error(" Failed to disconnect from DB", error);
  }
};
