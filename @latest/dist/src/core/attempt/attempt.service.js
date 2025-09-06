import { findByGUID, insert } from "./attempt.dao.ts";
export const createAttempt = async (data) => {
    const attempt = await insert(data);
    return attempt.guid;
};
export const findSecretByGUID = async (guid) => {
    const attempt = await findByGUID(guid);
    return attempt.secret;
};
