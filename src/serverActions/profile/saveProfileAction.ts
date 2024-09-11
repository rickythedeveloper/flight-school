"use server";

import { dbService } from "@/services/dbService/injection";
import type { Profile } from "@/services/dbService/dbService";
import type { OperationResult } from "@/utils/OperationResult";
import { serverAuthService } from "@/services/serverAuthService/injection";
import { loggerGenerator } from "@/services/loggerGenerator/injection";

type SaveProfileResult = OperationResult<undefined, undefined>;
export type SaveProfileAction = (
  profile: Profile,
) => Promise<SaveProfileResult>;

const logger = loggerGenerator.createLogger({ name: "save profile action" });

export const saveProfileAction: SaveProfileAction = async (
  profile,
): Promise<SaveProfileResult> => {
  const userId = await serverAuthService.getUserId();

  if (userId === null) {
    logger.error(
      "Attempted to save a profile of a user that is not authenticated.",
      { profile },
    );
    return { isSuccess: false };
  }

  const { isSuccess } = await dbService.upsertProfile(userId, profile);
  return { isSuccess };
};
