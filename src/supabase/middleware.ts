import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import type { Supabase } from "../../supabase/supabase.types";
import { envService } from "@/services/envService/injection";
import { pathService } from "@/services/pathService/injection";

const allowedPathsForUnauthenticated = ["/login", "/auth/confirm"] as const;

const pathnameIsAllowedForUnauthenticated = (pathname: string): boolean => {
  return allowedPathsForUnauthenticated.some((allowedPath) =>
    pathname.startsWith(allowedPath),
  );
};

export const updateSession = async (
  request: NextRequest,
): Promise<NextResponse> => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseConfig = envService.getSupabaseConfig();

  const supabase: Supabase = createServerClient(
    supabaseConfig.url,
    supabaseConfig.anonKey,
    {
      db: {
        schema: "flight_school",
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // This will refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !pathnameIsAllowedForUnauthenticated(request.nextUrl.pathname) &&
    user === null
  ) {
    console.info(
      "User is unauthenticated but tried to access content requiring authentication. Redirecting to login.",
    );
    const url = request.nextUrl.clone();
    url.pathname = pathService.login.url;
    return NextResponse.redirect(url);
  }

  return response;
};
