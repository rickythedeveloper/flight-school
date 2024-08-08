import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import { envService } from "@/services/envService/injection";

const allowedPathsForUnauthenticated = ["/login", "/auth/confirm"] as const;

const pathnameIsAllowedForUnauthenticated = (pathname: string): boolean => {
  return allowedPathsForUnauthenticated.some((allowedPath) =>
    pathname.startsWith(allowedPath),
  );
};

export const updateSession = async (
  request: NextRequest,
): Promise<NextResponse> => {
  // Unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseConfig = envService.getSupabaseConfig();

  const supabase = createServerClient(
    supabaseConfig.url,
    supabaseConfig.anonKey,
    {
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

  const isAuthenticated = user !== null;

  if (
    !isAuthenticated &&
    !pathnameIsAllowedForUnauthenticated(request.nextUrl.pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return response;
};
