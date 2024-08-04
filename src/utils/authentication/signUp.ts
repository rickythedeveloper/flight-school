"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { AuthenticationCredential } from "@/composites/SignInSignUpBox";
import { createSupabaseServerClient } from "@/supabase/server";

export const signUp = async ({
  email,
  password,
}: AuthenticationCredential): Promise<void> => {
  const origin = headers().get("origin");
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
};
