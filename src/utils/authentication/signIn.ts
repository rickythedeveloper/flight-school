"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/supabase/server";
import type { AuthenticationCredential } from "@/utils/authentication/AuthenticationCredential";

export const signIn = async ({
  email,
  password,
}: AuthenticationCredential): Promise<void> => {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/account");
};
