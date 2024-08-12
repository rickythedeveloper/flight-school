import type { Supabase } from "../../../supabase/supabase.types";

export type CreateServerClient = () => Supabase;

export interface SupabaseService {
  createServerClient: CreateServerClient;
}
