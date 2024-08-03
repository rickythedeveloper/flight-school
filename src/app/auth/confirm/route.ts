import { type NextRequest, NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/supabase/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const redirectTo = request.nextUrl.clone();

  redirectTo.pathname = "/account";
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type === "email") {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }

  return getErrorResponse(request);
}

const getErrorResponse = (request: NextRequest): NextResponse => {
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
};
