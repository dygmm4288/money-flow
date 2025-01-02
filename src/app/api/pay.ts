import { get, GET_PARAMS } from "@/lib/supabase/get";

export const get_pay = async (params: GET_PARAMS) => {
  return get("pay", params || {});
};
