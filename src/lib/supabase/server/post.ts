import { InsertSchema, ModelSchema } from "../../types/models.types";
import { createClient as createSsrClient } from "./server";

export const post = async <T extends ModelSchema>(
  model: T,
  modelSchema: InsertSchema<T>,
  require_user?: Boolean,
) => {
  const db = await createSsrClient();

  const user = (await db.auth.getUser()).data!;
  if (require_user && !user.user) {
    return new Error("not auth");
  }

  let data = { ...modelSchema };

  if (user.user) data = { ...data, user: user.user.id };

  const { error } = await db.from(model).insert(data);
  if (error) return error;
};
