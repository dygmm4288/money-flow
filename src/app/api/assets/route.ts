import { deleting } from "@/lib/supabase/server/delete";
import { get } from "@/lib/supabase/server/get";
import { post } from "@/lib/supabase/server/post";
import { put } from "@/lib/supabase/server/put";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const error = await post("assets", body);

  if (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Successfully created" },
    { status: 201 }
  );
};

export async function GET(req: NextRequest) {
  let { data: assets, error } = await get("assets");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(assets, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();

  const { id } = data;
  if (!id) {
    return NextResponse.json({ error: "Not Exists Data" }, { status: 404 });
  }

  const error = await deleting("assets", id as number);

  if (error) {
    return NextResponse.json({ error: "Not Exists Data" }, { status: 404 });
  }
  return NextResponse.json(null, { status: 200 });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateFields } = body;

    if (!id) {
      return NextResponse.json(
        { message: "ID가 필요합니다." },
        { status: 400 }
      );
    }

    const updatedData = await put("assets", id, updateFields);

    return NextResponse.json(
      { message: "자산이 성공적으로 수정되었습니다.", data: updatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating asset:", error);
    return NextResponse.json(
      { message: "자산 수정 중 오류가 발생했습니다.", error },
      { status: 500 }
    );
  }
}
