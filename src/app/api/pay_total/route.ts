import { createClient } from "@/lib/supabase/server/server";
import { NextRequest, NextResponse } from "next/server";

export type TotalAmount = {
  category: string;
  total_amount: number;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const start_date = searchParams.get("start_date") as string;
  const end_date = searchParams.get("end_date") as string;

  const supabase = await createClient();

  const { data: expense, error: expenseError } = await supabase.rpc(
    "get_expense_with_date",
    { start_date, end_date },
  );

  const { data: income, error: incomeError } = await supabase.rpc(
    "get_income_with_date",
    { start_date, end_date },
  );

  if (expenseError || incomeError) {
    return NextResponse.json(
      { message: "Something went wrong", expenseError, incomeError },
      { status: 500 },
    );
  }

  return NextResponse.json({ expense, income }, { status: 200 });
}
