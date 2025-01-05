import { createClient } from "@supabase/supabase-js";
import { InsertSchema, ModelSchema } from "../models.types";

export const postClient = async <T extends ModelSchema>(
  model: T,
  modelSchema: InsertSchema<T>,
) => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  try {
    const { error } = await db.from(model).insert(modelSchema);
    if (error) throw error;
  } catch (err) {
    throw err;
  }
};
