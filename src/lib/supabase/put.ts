import { ModelSchema } from "./models.types";
import { createClient } from "./server";
import { Database } from "./supabase.types";

export const put = async <T extends ModelSchema>(
  model: T,
  id: number,
  params: Database["public"]["Tables"][T]["Update"],
) => {
  const db = await createClient();

  const { data, error } = await db.from(model).update(params);
  if (error) throw error;

  return data;
};
