"use server";

import { dbService } from "@/services/dbService/injection";
import type { GetProfile } from "@/services/dbService/dbService";

export type GetProfileAction = GetProfile;

export const getProfileAction: GetProfileAction = async () => {
  return dbService.getProfile();
};
