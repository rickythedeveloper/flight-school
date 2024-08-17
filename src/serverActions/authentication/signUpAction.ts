"use server";

import { headers } from "next/headers";
import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";
import { serverAuthService } from "@/services/serverAuthService/injection";
import type { OperationResult } from "@/utils/OperationResult";

type SignUpData = { action: "checkEmail" };

export type SignUpAction = (
  credential: AuthCredential,
) => Promise<OperationResult<SignUpData, undefined>>;

export const signUpAction: SignUpAction = async ({ email, password }) => {
  const origin = headers().get("origin");

  const { isSuccess } = await serverAuthService.signUp(
    { email, password },
    `${origin}/auth/callback`,
  );

  if (isSuccess) {
    return {
      isSuccess: true,
      data: { action: "checkEmail" },
    };
  }

  return {
    isSuccess: false,
    error: undefined,
  };
};
