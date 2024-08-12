import type { Supabase } from "../../../supabase/supabase.types";
import type {
  GetUserId,
  ServerAuthService,
  SignIn,
  SignUp,
  VerifyOtp,
} from "@/services/serverAuthService/serverAuthService";
import type { Logger } from "@/services/loggerGenerator/loggerGenerator";
import type { SupabaseService } from "@/services/supabaseService/supabaseService";

export class ServerAuthServiceImpl implements ServerAuthService {
  private supabase: Supabase;

  constructor(
    supabaseService: SupabaseService,
    private logger: Logger,
  ) {
    this.supabase = supabaseService.createServerClient();
  }

  signIn: SignIn = async (credential) => {
    this.logger.info("Signing in with password.");
    const { error: signInError, data: signInData } =
      await this.supabase.auth.signInWithPassword(credential);
    if (signInError) {
      this.logger.warn("Sign in failed.", { error: signInError });
      return { isSuccess: false, hasProfile: null };
    }

    this.logger.info("Signed in successfully.", { email: credential.email });

    const user = signInData.user;

    const {
      error: profileError,
      count: profileCount,
      status,
      statusText,
    } = await this.supabase
      .from("profile")
      .select("*", { count: "exact", head: true })
      .eq("id", user.id);

    if (profileCount === null) {
      this.logger.error(
        "Failed to find profile. This indicates an issue with accessing the table.",
        {
          error: profileError,
          status,
          statusText,
        },
      );
      return { isSuccess: false, hasProfile: null };
    }

    if (profileCount === 0) {
      this.logger.warn("Profile not found", {
        error: profileError,
        status,
        statusText,
      });
      return { isSuccess: true, hasProfile: false };
    }

    return { isSuccess: true, hasProfile: true };
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

  getUserId: GetUserId = async () => {
    const { data } = await this.supabase.auth.getUser();
    return data?.user?.id ?? null;
  };
}
