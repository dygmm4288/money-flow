import { Database } from "./supabase.types";

export type ModelSchema = keyof Database[Extract<
  keyof Database,
  "public"
>]["Tables"];
