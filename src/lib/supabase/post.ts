import { ModelSchema } from "./models.types";
import { createClient } from "./server";
import { Database } from "./supabase.types";

export const post = async <T extends ModelSchema>(
  model: T,
  modelSchema: Database["public"]["Tables"][T]["Insert"],
) => {
  const db = await createClient();

  try {
    const { error } = await db.from(model).insert(modelSchema);
    if (error) throw error;
  } catch (err) {
    throw err;
  }
};
