import { ModelSchema, UpdateSchema } from "../models.types";
import { createClient } from "../server";

export const put = async <T extends ModelSchema>(
  model: T,
  id: number,
  params: UpdateSchema<T>,
) => {
  const db = await createClient();

  const { data, error } = await db.from(model).update(params);
  if (error) throw error;

  return data;
};
