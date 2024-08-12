import type { SupabaseService } from "@/services/supabaseService/supabaseService";
import { SupabaseServiceImpl } from "@/services/supabaseService/supabaseServiceImpl";
import { envService } from "@/services/envService/injection";

export const supabaseService: SupabaseService = new SupabaseServiceImpl(
  envService,
);
