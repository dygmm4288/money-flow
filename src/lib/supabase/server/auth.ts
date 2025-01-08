import { redirect } from "next/navigation";
import { createClient } from "./server";

export const getSession = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) return null;

  return data.session;
};

export const authGuard = () => {
  const session = getSession();

  if (!session) {
    redirect("/login?type=signin");
  }

  return;
};
