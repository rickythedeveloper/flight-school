import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ServerAuthService,
  SignIn,
  SignUp,
  VerifyOtp,
} from "@/services/serverAuthService/serverAuthService";
import type { EnvService } from "@/services/envService/envService";
import { createSupabaseServerClient } from "@/supabase/server";

export class ServerAuthServiceImpl implements ServerAuthService {
  private supabase: SupabaseClient;

  constructor(envService: EnvService) {
    const supabaseConfig = envService.getSupabaseConfig();

    this.supabase = createSupabaseServerClient({
      url: supabaseConfig.url,
      anonKey: supabaseConfig.anonKey,
    });
  }

  signIn: SignIn = async (credential) => {
    const { error } = await this.supabase.auth.signInWithPassword(credential);
    return { isSuccess: error === null };
  };

  signUp: SignUp = async (credential, redirectUrl) => {
    const { error } = await this.supabase.auth.signUp({
      ...credential,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    return { isSuccess: error === null };
  };

  verifyOtp: VerifyOtp = async (type, tokenHash) => {
    const { error } = await this.supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    return { isSuccess: error === null };
  };
}
