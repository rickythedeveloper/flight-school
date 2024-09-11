"use server";

import { dbService } from "@/services/dbService/injection";
import type { Profile } from "@/services/dbService/dbService";
import { serverAuthService } from "@/services/serverAuthService/injection";
import { loggerGenerator } from "@/services/loggerGenerator/injection";
import type { OperationResult } from "@/utils/OperationResult";

type GetProfileResult = OperationResult<
  Profile,
  "notAuthenticated" | "profileNotFound"
>;
export type GetProfileAction = () => Promise<GetProfileResult>;

const logger = loggerGenerator.createLogger({ name: "get profile action" });

export const getProfileAction: GetProfileAction =
  async (): Promise<GetProfileResult> => {
    const userId = await serverAuthService.getUserId();

    if (userId === null) {
      logger.error("Attempted to get profile for an unauthenticated user.");
      return { isSuccess: false, error: "notAuthenticated" };
    }

    const selectProfileResult = await dbService.selectProfile(userId);
    return selectProfileResult.isSuccess ? { isSuccess: true, data: selectProfileResult.data } : { isSuccess: false, error: "profileNotFound" };
  };
