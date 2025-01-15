import { createClient } from "@/lib/supabase/server/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  let { data: pay, error } = await supabase.from("pay_duplicate").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(pay, { status: 200 });
}
