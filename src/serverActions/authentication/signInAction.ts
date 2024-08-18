"use server";

import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";
import { serverAuthService } from "@/services/serverAuthService/injection";
import type { OperationResult } from "@/utils/OperationResult";

type SignInResult = OperationResult<{ hasProfile: boolean }, undefined>;

export type SignInAction = (
  credential: AuthCredential,
) => Promise<SignInResult>;

export const signInAction: SignInAction = async ({
  email,
  password,
}): Promise<SignInResult> => {
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
  };
};
