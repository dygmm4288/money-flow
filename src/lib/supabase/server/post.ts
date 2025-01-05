import { InsertSchema, ModelSchema } from "../../types/models.types";
import { createClient as createSsrClient } from "../server";

export const post = async <T extends ModelSchema>(
  model: T,
  modelSchema: InsertSchema<T>,
) => {
  const db = await createSsrClient();

  try {
    const { error } = await db.from(model).insert(modelSchema);
    if (error) throw error;
  } catch (err) {
    throw err;
  }
};
