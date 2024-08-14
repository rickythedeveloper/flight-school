import type { ReactElement } from "react";
import { SignInSignUpBox } from "@/composites/SignInSignUpBox";
import { signIn } from "@/serverActions/authentication/signIn";
import { signUp } from "@/serverActions/authentication/signUp";
import { AuthContainer } from "@/components/layout/AuthContainer";

export default function Login(): ReactElement {
  return (
    <AuthContainer>
      <SignInSignUpBox signInAction={signIn} signUpAction={signUp} />
    </AuthContainer>
  );
}
