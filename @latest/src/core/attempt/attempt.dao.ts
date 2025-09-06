import { db } from "../../postgres/index.ts";
import { attemptsTable } from "../attempt.schema.ts";
import { eq } from "drizzle-orm";

export const insert = async (data: IAttempt.Insert) => {
  const [attempt] = await db.insert(attemptsTable).values(data).returning({
    guid: attemptsTable.guid,
  });
  return attempt;
};

export const findByGUID = async (guid: string) => {
  const [attempt] = await db.select({
    secret: attemptsTable.secret,
  }).from(attemptsTable).where(eq(attemptsTable.guid, guid));
  return attempt;
};
