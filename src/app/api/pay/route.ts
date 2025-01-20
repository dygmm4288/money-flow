import { get } from "@/lib/supabase/server/get";
import { post } from "@/lib/supabase/server/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  let { data: pay, error } = await get("pay");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(pay, { status: 200 });
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const error = await post("pay", body);

  if (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Successfully created" },
    { status: 201 },
  );
};
