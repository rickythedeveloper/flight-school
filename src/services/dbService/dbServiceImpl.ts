import type { SupabaseService } from "@/services/supabaseService/supabaseService";
import type { Logger } from "@/services/loggerGenerator/loggerGenerator";
import type {
  InsertSchoolImage,
  InsertSchool,
  DbService,
  SelectProfile,
  Profile,
  UpsertProfile,
} from "@/services/dbService/dbService";

export class DbServiceImpl implements DbService {
  constructor(
    private supabaseService: SupabaseService,
    private logger: Logger,
  ) {}

  selectProfile: SelectProfile = async (userId) => {
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
      return { isSuccess: false };
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

  upsertProfile: UpsertProfile = async (userId, profile) => {
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

  insertSchool: InsertSchool = async (school) => {
    const supabase = this.supabaseService.createServerClient();

    const { data, error, status, statusText } = await supabase
      .from("school")
      .insert({
        name: school.name,
        description: school.description,
      })
      .select()
      .single();

    if (error) {
      this.logger.error("Failed to insert a school", {
        error,
        status,
        statusText,
        school,
      });
      return { isSuccess: false };
    }

    this.logger.info("Successfully created a school", { school });
    return { isSuccess: true, data: { id: data.id } };
  };

  insertSchoolImage: InsertSchoolImage = async (schoolImage) => {
    const supabase = this.supabaseService.createServerClient();

    const { data, error, status, statusText } = await supabase
      .from("school_image")
      .insert({
        school_id: schoolImage.schoolId,
        resource_id: schoolImage.imageId,
      })
      .select()
      .single();

    if (error) {
      this.logger.error("Failed to insert a school image", {
        error,
        status,
        statusText,
        schoolImage,
      });
      return { isSuccess: false };
    }

    this.logger.info("Successfully inserted a school image", { schoolImage });
    return { isSuccess: true, data: { id: data.id } };
  };
}
