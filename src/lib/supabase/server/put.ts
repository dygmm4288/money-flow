import { ModelSchema, UpdateSchema } from "../../types/models.types";
import { createClient } from "../server";

export const put = async <T extends ModelSchema>(
  model: T,
  id: number,
  params: UpdateSchema<T>,
) => {
  const db = await createClient();

  const { data, error } = await db
    .from(model)
    .update(params)
    .eq("id", id)
    .select();
  if (error) throw error;

  return data;
};
