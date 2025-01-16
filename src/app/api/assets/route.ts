import { get } from "@/lib/supabase/server/get";
import { post } from "@/lib/supabase/server/post";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const error = await post("assets", body);

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

export async function GET(req: NextRequest) {
  let { data: assets, error } = await get("assets");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(assets, { status: 200 });
}
