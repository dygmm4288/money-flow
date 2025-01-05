import { createClient } from "@supabase/supabase-js";
import { ModelSchema, UpdateSchema } from "../models.types";

export const putClient = async <T extends ModelSchema>(
  model: T,
  id: number,
  params: UpdateSchema<T>,
) => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error } = await db.from(model).update(params).eq("id", id);
  if (error) throw error;

  return data;
};
