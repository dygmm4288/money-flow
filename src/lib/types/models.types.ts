import { Database } from "./supabase.types";

export type ModelSchema = keyof Database[Extract<
  keyof Database,
  "public"
>]["Tables"];

export type UpdateSchema<T extends ModelSchema> =
  Database["public"]["Tables"][T]["Update"];

export type InsertSchema<T extends ModelSchema> =
  Database["public"]["Tables"][T]["Insert"];
