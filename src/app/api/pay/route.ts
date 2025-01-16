import { get } from "@/lib/supabase/server/get";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let { data: pay, error } = await get("pay");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(pay, { status: 200 });
}
