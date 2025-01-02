import _ from "lodash";
import { createClient } from "./server";

export type GET_PARAMS = {
  limit?: number;
  start?: number;
  end?: number;
  order?: `${string} asc` | `${string} desc`;
  id?: string;
};

export const get = async (model: string, params: GET_PARAMS) => {
  const db = await createClient();

  const query = db.from(model).select();

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

    if (_.includes(["asc", "desc"], key) && typeof value === "string") {
      const [column, asc] = _.split(value, " ");

      query.order(column, { ascending: asc === "asc" });
      return;
    }

    if (key.includes("_lt") && typeof value === "string") {
      const [column] = _.split(value, "_lt");

      if (key.includes("_lte")) {
        query.lte(model, column);
        return;
      }

      query.lt(model, column);
    }
    if (key.includes("_gt") && typeof value === "string") {
      const [column] = _.split(value, "_lt");

      if (key.includes("_gte")) {
        query.gte(model, column);
        return;
      }

      query.gt(model, column);
    }

    query.eq(key, value);
  });

  return query.then();
};

export const get_only_user = (model: string, params: GET_PARAMS) => {
  // TODO : user 확인 로직 추가
  return get(model, params);
};

export const get_one = (model: string, id: string, params: GET_PARAMS) => {
  return get(model, _.merge(params, { limit: 1, id }));
};
