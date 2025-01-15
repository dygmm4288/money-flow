import { createClient } from "@/lib/supabase/server/server";

export default async function TestPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  console.log(data, error);
}
