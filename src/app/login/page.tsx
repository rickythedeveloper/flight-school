import type { ReactElement } from "react";
import { SignInSignUpBox } from "@/composites/SignInSignUpBox";
import { signIn } from "@/utils/authentication/signIn";
import { signUp } from "@/utils/authentication/signUp";
import { AuthContainer } from "@/components/layout/AuthContainer";

export default function Login(): ReactElement {
  return (
    <AuthContainer>
      <SignInSignUpBox signIn={signIn} signUp={signUp} />
    </AuthContainer>
  );
}
