"use server";

import { redirect } from "next/navigation";

import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";

import { serverAuthService } from "@/services/serverAuthService/injection";

export const signIn = async ({
  email,
  password,
}: AuthCredential): Promise<void> => {
  const { isSuccess } = await serverAuthService.signIn({ email, password });

  const redirectUrl = isSuccess
    ? "/account"
    : "/login?message=Could not authenticate user";

  return redirect(redirectUrl);
};
