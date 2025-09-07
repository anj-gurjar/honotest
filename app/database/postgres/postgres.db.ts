import {Pool} from 'pg'


import { drizzle } from "drizzle-orm/node-postgres";

// Create pool
export const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export const db = drizzle(client, {
  schema: {
    
  },
});


export const connect = async () => {
  try {
     await client.connect();
    console.log("Database connected");
    
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
