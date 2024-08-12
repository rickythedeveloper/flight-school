import type { EnvService } from "@/services/envService/envService";
import { createSupabaseServerClient } from "@/supabase/server";
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
