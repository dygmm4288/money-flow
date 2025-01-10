import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
    const supabase = await createClient();

    const { data: expanse } = await supabase.rpc('get_exense_total');
    const { data: income } = await supabase.rpc('get_income_total');


    return {
        expanse,
        income
    };
}
