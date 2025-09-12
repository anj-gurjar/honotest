import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { moodTable } from "../mood/mood.schema";

export const playList = pgTable("playlist", {
  guid: uuid().primaryKey().notNull().defaultRandom(),
  useId: text().notNull(),
  moodId: uuid("moodtype").references(() => moodTable.guid),
});
