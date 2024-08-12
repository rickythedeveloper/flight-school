"use server";

import { dbService } from "@/services/dbService/injection";
import type { Profile } from "@/services/dbService/dbService";

export const saveProfile = async (
  profile: Profile,
): Promise<{ isSuccess: boolean }> => {
  const { isSuccess } = await dbService.saveProfile(profile);
  return { isSuccess };
};
