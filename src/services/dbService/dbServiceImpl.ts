import type { SupabaseService } from "@/services/supabaseService/supabaseService";
import type { Logger } from "@/services/loggerGenerator/loggerGenerator";
import type { DbService, SaveProfile } from "@/services/dbService/dbService";
import type { ServerAuthService } from "@/services/serverAuthService/serverAuthService";

export class DbServiceImpl implements DbService {
  constructor(
    private supabaseService: SupabaseService,
    private serverAuthService: ServerAuthService,
    private logger: Logger,
  ) {}

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
