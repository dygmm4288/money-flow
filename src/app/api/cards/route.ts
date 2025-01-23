import { post } from "@/lib/supabase/server/post";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = await post("cards", body);

  if (result instanceof Error) {
    return NextResponse.json(
      { message: "Something went wrong", error: result },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Successfully created", card: result[0] },
    { status: 201 }
  );
};
