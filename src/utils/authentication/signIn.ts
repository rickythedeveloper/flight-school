"use server";

import { redirect } from "next/navigation";

import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";
import { authService } from "@/services";

export const signIn = async ({
  email,
  password,
}: AuthCredential): Promise<void> => {
  const { isSuccess } = await authService.signIn({ email, password });

  const redirectUrl = isSuccess
    ? "/account"
    : "/login?message=Could not authenticate user";

  return redirect(redirectUrl);
};
