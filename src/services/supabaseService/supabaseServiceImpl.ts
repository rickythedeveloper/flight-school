import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Supabase } from "../../../supabase/supabase.types";
import type { EnvService } from "@/services/envService/envService";
import type {
  CreateServerClient,
  SupabaseService,
} from "@/services/supabaseService/supabaseService";

export class SupabaseServiceImpl implements SupabaseService {
  constructor(private envService: EnvService) {}

  createServerClient: CreateServerClient = () => {
    const supabaseConfig = this.envService.getSupabaseConfig();
    return createSupabaseServerClient({
      url: supabaseConfig.url,
      anonKey: supabaseConfig.anonKey,
    });
  };
}

const createSupabaseServerClient = (config: {
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
          console.error(error);
        }
      },
    },
    db: {
      schema: "flight_school",
    },
  });
};
