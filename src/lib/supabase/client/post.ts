import { InsertSchema, ModelSchema } from "../../types/models.types";
import db from "./client";

export const postClient = async <T extends ModelSchema>(
  model: T,
  modelSchema: InsertSchema<T>,
) => {
  try {
    const { error } = await db.from(model).insert(modelSchema);
    if (error) throw error;
  } catch (err) {
    throw err;
  }
};
