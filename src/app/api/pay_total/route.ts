import { createClient } from "@/lib/supabase/server/server";
import { NextResponse } from "next/server";

export type TotalAmount = {
  category: string;
  total_amount: number;
};

export async function GET() {
  const supabase = await createClient();

  const { data: expense, error: expenseError } = await supabase.rpc(
    "get_expense_duplicate_total"
  );

  const { data: income, error: incomeError } = await supabase.rpc(
    "get_income_duplicate_total"
  );

  if (expenseError || incomeError) {
    return NextResponse.json(
      { message: "Something went wrong", expenseError, incomeError },
      { status: 500 }
    );
  }

  return NextResponse.json({ expense, income }, { status: 200 });
}
