interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export type GetSupabaseConfig = () => SupabaseConfig;

export interface EnvService {
  getSupabaseConfig: GetSupabaseConfig;
}
