import { createClient } from "./server";

export type PUT_PARAMS = {};

export const put = async (model: string, id: string, params: PUT_PARAMS) => {
  const db = await createClient();

  // TODO: UPDATE LOGIC
  await db.from(model);
};
