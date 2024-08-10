"use server";

import { redirect } from "next/navigation";

import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";

import { serverAuthService } from "@/services/serverAuthService/injection";

export const signIn = async ({
  email,
  password,
}: AuthCredential): Promise<void> => {
  const { isSuccess, hasProfile } = await serverAuthService.signIn({
    email,
    password,
  });

  const redirectUrl = isSuccess
    ? hasProfile
      ? "/profile"
      : "/profile/edit"
    : "/login?message=Could not authenticate user";

  return redirect(redirectUrl);
};
