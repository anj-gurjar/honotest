import { pgTable, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";


export const moodEnum = pgEnum("mood_type", ["sad", "happy", "spiritual"]);


export const moodTable = pgTable("mood_table", {
  guid: uuid("guid").defaultRandom().primaryKey().notNull(),
  moodType: moodEnum("mood_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
