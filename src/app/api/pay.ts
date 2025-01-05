import { get, get_one, GET_PARAMS } from "@/lib/supabase/get";

export const get_pays = async (params?: GET_PARAMS) => {
  return get("pay", params || {});
};

export const get_pay = async (id: number, params?: GET_PARAMS) => {
  return get_one("pay", id, params || {});
};
