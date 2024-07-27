import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactElement } from "react";
import { createSupabaseServerClient } from "@/supabase/server";
import type { AuthenticationCredential } from "@/composites/SignInSignUpBox";
import { SignInSignUpBox } from "@/composites/SignInSignUpBox";

export default function Login(): ReactElement {
  const signIn = async ({
    email,
    password,
  }: AuthenticationCredential): Promise<void> => {
    "use server";

    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async ({
    email,
    password,
  }: AuthenticationCredential): Promise<void> => {
    "use server";

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
      console.log(error);
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <SignInSignUpBox signIn={signIn} signUp={signUp} />
    </div>
  );
}
