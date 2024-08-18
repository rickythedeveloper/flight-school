import type { SupabaseService } from "@/services/supabaseService/supabaseService";
import type { Logger } from "@/services/loggerGenerator/loggerGenerator";
import type {
  DbService,
  GetProfile,
  Profile,
  SaveProfile,
} from "@/services/dbService/dbService";
import type { ServerAuthService } from "@/services/serverAuthService/serverAuthService";

export class DbServiceImpl implements DbService {
  constructor(
    private supabaseService: SupabaseService,
    private serverAuthService: ServerAuthService,
    private logger: Logger,
  ) {}

  getProfile: GetProfile = async () => {
    const userId = await this.serverAuthService.getUserId();

    if (userId === null) {
      this.logger.error(
        "Attempted to get profile for an unauthenticated user.",
      );
      return { isSuccess: false, error: "notAuthenticated" };
    }

    const supabase = this.supabaseService.createServerClient();

    const { data, error, status, statusText } = await supabase
      .from("profile")
      .select("first_name, last_name")
      .eq("id", userId)
      .single();

    if (error !== null) {
      this.logger.error("Could not get profile for a user.", {
        userId,
        error,
        status,
        statusText,
      });
      return { isSuccess: false, error: "profileNotFound" };
    }

    const profile: Profile = {
      firstName: data.first_name,
      lastName: data.last_name,
    };

    this.logger.info("Retrieved profile for user.", { userId, profile });

    return {
      isSuccess: true,
      data: profile,
    };
  };

  saveProfile: SaveProfile = async (profile) => {
    const userId = await this.serverAuthService.getUserId();

    if (userId === null) {
      this.logger.error(
        "Attempted to save a profile of a user that is not authenticated.",
        { profile },
      );
      return { isSuccess: false };
    }

    const supabase = this.supabaseService.createServerClient();

    const { error, status, statusText } = await supabase
      .from("profile")
      .upsert({
        id: userId,
        first_name: profile.firstName,
        last_name: profile.lastName,
      });

    if (error) {
      this.logger.error("Failed to save a profile.", {
        error,
        status,
        statusText,
        profile,
      });
      return { isSuccess: false };
    }

    this.logger.info("Successfully saved a profile", { profile });
    return { isSuccess: true };
  };
}
