import { getSession } from "@/lib/supabase/server/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  // If the user is authenticated, continue as normal
  if (session) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login?type=signin"));
}

export const config = {
  matcher: "/dashboard/:path*",
};
