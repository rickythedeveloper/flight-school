import type { ReactElement } from "react";
import { SignInSignUpBox } from "@/composites/SignInSignUpBox";
import { signInAction } from "@/serverActions/authentication/signInAction";
import { signUpAction } from "@/serverActions/authentication/signUpAction";
import { AuthContainer } from "@/components/layout/AuthContainer";

export default function Login(): ReactElement {
  return (
    <AuthContainer>
      <SignInSignUpBox
        signInAction={signInAction}
        signUpAction={signUpAction}
      />
    </AuthContainer>
  );
}
