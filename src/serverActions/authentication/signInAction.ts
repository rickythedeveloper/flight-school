"use server";

import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";
import { serverAuthService } from "@/services/serverAuthService/injection";
import type { OperationResult } from "@/utils/OperationResult";

export type SignInAction = (
  credential: AuthCredential,
) => Promise<OperationResult<{ hasProfile: boolean }, undefined>>;

export const signInAction: SignInAction = async ({ email, password }) => {
  const { isSuccess, hasProfile } = await serverAuthService.signIn({
    email,
    password,
  });

  if (isSuccess) {
    return {
      isSuccess: true,
      data: { hasProfile },
    };
  }

  return {
    isSuccess: false,
    error: undefined,
  };
};
