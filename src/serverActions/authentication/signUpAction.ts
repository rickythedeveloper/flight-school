"use server";

import { headers } from "next/headers";
import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";
import { serverAuthService } from "@/services/serverAuthService/injection";
import type { OperationResult } from "@/utils/OperationResult";

type SignUpData = { action: "checkEmail" };
type SignUpResult = OperationResult<SignUpData, undefined>;

export type SignUpAction = (
  credential: AuthCredential,
) => Promise<SignUpResult>;

export const signUpAction: SignUpAction = async ({
  email,
  password,
}): Promise<SignUpResult> => {
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
  };
};
