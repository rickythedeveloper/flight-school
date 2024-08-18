"use server";

import { dbService } from "@/services/dbService/injection";
import type { Profile } from "@/services/dbService/dbService";
import type { OperationResult } from "@/utils/OperationResult";

type SaveProfileResult = OperationResult<undefined, undefined>;
export type SaveProfileAction = (
  profile: Profile,
) => Promise<SaveProfileResult>;

export const saveProfileAction: SaveProfileAction = async (
  profile,
): Promise<SaveProfileResult> => {
  const { isSuccess } = await dbService.saveProfile(profile);
  return { isSuccess };
};
