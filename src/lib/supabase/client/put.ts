import { ModelSchema, UpdateSchema } from "../../types/models.types";
import db from "./client";

export const putClient = async <T extends ModelSchema>(
  model: T,
  id: number,
  params: UpdateSchema<T>,
) => {
  const { data, error } = await db.from(model).update(params).eq("id", id);
  if (error) throw error;

  return data;
};
