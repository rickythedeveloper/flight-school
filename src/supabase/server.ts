import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getEnvironment } from "@/utils/environment/environment";
import type { SupabaseClient } from "@supabase/supabase-js";

export const createSupabaseServerClient = (): SupabaseClient => {
  const cookieStore = cookies();
  const env = getEnvironment();

  return createServerClient(env.supabase.url, env.supabase.anonKey, {
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
  });
};
