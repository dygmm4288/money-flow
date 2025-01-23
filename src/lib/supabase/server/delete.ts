import { ModelSchema } from "../../types/models.types";
import { createClient as createSsrClient } from "./server";

export const deleting = async <T extends ModelSchema>(model: T, id: number) => {
  const db = await createSsrClient();

  const user = (await db.auth.getUser()).data!;

  if (!user) {
    return new Error("Not Authenticated");
  }

  const { error } = await db.from(model).delete().eq("id", id);
  if (error) return error;
};
