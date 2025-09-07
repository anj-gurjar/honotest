import * as postgres from "./postgres/index";

export const connect = async () => {
  await Promise.all([postgres.connect()]);
};

export const disconnect = async () => {
  await Promise.all([postgres.disconnect()]);
};
