import { createClient } from "./server";

export const post = async (model: string, modelSchema: unknown) => {
  const db = await createClient();

  try {
    const { data, error } = await db.from(model).insert(modelSchema);
    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
};
