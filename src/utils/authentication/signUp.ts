"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/supabase/server";
import type { AuthenticationCredential } from "@/utils/authentication/AuthenticationCredential";

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
