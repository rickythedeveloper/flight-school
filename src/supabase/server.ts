import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Supabase } from "../../supabase/supabase.types";

export const createSupabaseServerClient = (config: {
  url: string;
  anonKey: string;
}): Supabase => {
  const cookieStore = cookies();

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
    db: {
      schema: "flight_school",
    },
  });
};
