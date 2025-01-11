import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  let { data: expenseData, error: expenseError } = await supabase.rpc(
    "get_expense_total"
  );
  let { data: incomeData, error: incomeError } = await supabase.rpc(
    "get_income_total"
  );

  // 에러 처리 추가
  if (expenseError || incomeError) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }

  // 성공적인 응답 반환
  return new Response(JSON.stringify({ expenseData, incomeData }), {
    status: 200,
  });
}
