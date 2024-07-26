import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { getEnvironment } from "@/utils/environment/environment";

export const updateSession = async (
  request: NextRequest,
): Promise<NextResponse> => {
  // Unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const environment = getEnvironment();

  const supabase = createServerClient(
    environment.supabase.url,
    environment.supabase.anonKey,
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
  await supabase.auth.getUser();

  return response;
};
