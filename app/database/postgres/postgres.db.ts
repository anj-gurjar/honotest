// @deno-types="@types/pg"
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
// import { usersTable } from "@/user/user.schema.ts";
// import { userOrgsTable } from "@/user/org/org.schema.ts";
// import { orgsTable } from "@/org/org.schema.ts";
// import { rolesTable } from "@/role/role.schema.ts";
// import { rolePermissionsTable } from "@/role/permission/permission.schema.ts";
// import * as loginTables from "@/login/login.schema.ts";
// import * as oauthTables from "@/oauth/oauth.schema.ts";
// import * as passwordTables from "@/password/password.schema.ts";
// import * as permissionTables from "@/permission/permission.schema.ts";
// import * as verificationTables from "@/verification/verification.schema.ts";
// import { highlight } from "sql-highlight";
// import { createMessage } from "@utils/logger.util.ts";
// import { createApp } from "@/oauth/app/app.service.ts";

export const client = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

export const db = drizzle({
  logger: true,
  client,
  schema: {},
});

export const connect = async () => {
  try {
    console.info("Connecting...");
    await client.connect();
    console.info("Connected !");
    // const creds = await createApp({
    //   name: "Genepedia",
    //   redirectURIs: ["http://localhost:8001/oauth/callback"],
    //   createdBy: "83c782c1-8c29-4d44-afb0-a3188a190b40",
    //   org: "a6b3b0d1-100f-4778-b0d1-9e75bc1609bf",
    //   scopes: ["openid", "email", "phone", "profile", "address"],
    //   grantTypes: ["authorization_code", "refresh_token"],
    // });
    // console.log(creds);
  } catch (err) {
    console.error((err as Error).message);
    throw err;
  }
};

export const disconnect = async () => {
  try {
    console.info("DisConnecting...");
    await client.end();
    console.info("DisConnected !");
  } catch (err) {
    console.error((err as Error).message);
    throw err;
  }
};
