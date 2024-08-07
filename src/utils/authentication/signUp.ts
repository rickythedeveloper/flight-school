"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";
import { authService } from "@/services";

export const signUp = async ({
  email,
  password,
}: AuthCredential): Promise<void> => {
  const origin = headers().get("origin");

  const { isSuccess } = await authService.signUp(
    { email, password },
    `${origin}/auth/callback`,
  );

  const redirectUrl = isSuccess
    ? "/login?message=Check email to continue sign in process"
    : "/login?message=Could not authenticate user";

  return redirect(redirectUrl);
};
