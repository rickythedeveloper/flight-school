import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ServerAuthService,
  SignIn,
  SignUp,
  VerifyOtp,
} from "@/services/serverAuthService/serverAuthService";
import type { EnvService } from "@/services/envService/envService";
import { createSupabaseServerClient } from "@/supabase/server";
import type { Logger } from "@/services/loggerGenerator/loggerGenerator";

export class ServerAuthServiceImpl implements ServerAuthService {
  private supabase: SupabaseClient;

  constructor(
    envService: EnvService,
    private logger: Logger,
  ) {
    const supabaseConfig = envService.getSupabaseConfig();

    this.supabase = createSupabaseServerClient({
      url: supabaseConfig.url,
      anonKey: supabaseConfig.anonKey,
    });
  }

  signIn: SignIn = async (credential) => {
    this.logger.info("Signing in with password.");
    const { error } = await this.supabase.auth.signInWithPassword(credential);
    if (error) {
      this.logger.warn("Sign in failed.", { error });
    } else {
      this.logger.info("Signed in successfully.", { email: credential.email });
    }

    return { isSuccess: error === null };
  };

  signUp: SignUp = async (credential, redirectUrl) => {
    this.logger.info("Signing up.");
    const { error } = await this.supabase.auth.signUp({
      ...credential,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    if (error) {
      this.logger.warn("Sign up failed", { error });
    } else {
      this.logger.info("Signed up successfully", { email: credential.email });
    }
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
