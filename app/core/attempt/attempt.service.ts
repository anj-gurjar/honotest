import { findByGUID, insert } from "./attempt.dao";

export const createAttempt = async (data: IAttempt.CreateData) => {
  const attempt = await insert(data);
  return attempt.guid;
};

export const findSecretByGUID = async (guid: string) => {
  const attempt = await findByGUID(guid);
  return attempt.secret;
};
