import _ from "lodash";
import { ModelSchema } from "../../types/models.types";
import { Database } from "../../types/supabase.types";
import { createClient } from "./server";

export type GET_PARAMS = {
  limit?: number;
  start?: number;
  end?: number;
  order?: `${string} asc` | `${string} desc`;
  id?: number;
  [key: string]: any;
};

export const get = async <T extends ModelSchema>(
  model: T,
  params?: GET_PARAMS,
): Promise<Database["public"]["Tables"][T]["Row"][] | null> => {
  const db = await createClient();

  const query = db.from(model).select();

  // 최소 값 설정
  if (!params) params = {};
  if (!params.limit) params.limit = 10;
  if (!params.start) params.start = 0;

  _.forEach(params, (value, key) => {
    if (!value || key === "end") return;

    if (key === "limit" && typeof value === "number") {
      query.limit(value);
      return;
    }

    if (key === "start" && typeof value === "number") {
      query.range(value, params.end || value + 10);
      return;
    }

    if (key.includes("_in")) {
    }

    if (key.includes("_contains")) {
    }

    if (key === "order") {
      const [column, direction] = (value as string).split(" ");
      const ascending = direction?.toLowerCase() !== "desc";
      // column과 ascending 제대로 설정했는지 확인
      query.order(column, { ascending });
      return;
    }

    if (key.endsWith("_lt")) {
      const column = key.replace("_lt", "");
      query.lt(column, value);
      return;
    }
    if (key.endsWith("_lte")) {
      const column = key.replace("_lte", "");
      query.lte(column, value);
      return;
    }
    if (key.endsWith("_gt")) {
      const column = key.replace("_gt", "");
      query.gt(column, value);
      return;
    }
    if (key.endsWith("_gte")) {
      const column = key.replace("_gte", "");
      query.gte(column, value);
      return;
    }

    query.eq(key, value);
  });

  // console.log(query, params);

  try {
    const { data } = await query.then();
    return data;
  } catch (err) {
    throw err;
  }
};

export const get_only_user = async (
  model: ModelSchema,
  params?: GET_PARAMS,
  nextPath?: string,
) => {
  return get(model, params);
};

export const get_one = (
  model: ModelSchema,
  id: number,
  params?: GET_PARAMS,
) => {
  return get(model, _.merge(params, { limit: 1, id }));
};
