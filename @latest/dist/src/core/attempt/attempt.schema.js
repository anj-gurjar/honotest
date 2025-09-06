import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const attemptsTable = pgTable("oauth_attempts", {
    // extension pgcrypto
    guid: uuid().primaryKey().notNull().defaultRandom(),
    secret: text(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull()
        .defaultNow(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull()
        .defaultNow(),
});
