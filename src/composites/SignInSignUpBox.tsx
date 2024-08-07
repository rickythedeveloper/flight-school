"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { Button } from "@/components/buttons/Button";
import { EmailTextField } from "@/components/inputs/textInputs/EmailTextField";
import { PasswordTextField } from "@/components/inputs/textInputs/PasswordTextField";
import type { AuthenticationCredential } from "@/utils/authentication/AuthenticationCredential";

export interface SignInSignUpBoxProps {
  signIn: (credential: AuthenticationCredential) => void;
  signUp: (credential: AuthenticationCredential) => void;
}

export const SignInSignUpBox = ({
  signIn,
  signUp,
}: SignInSignUpBoxProps): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [requiresNonEmptyFields, setRequiresNonEmptyFields] =
    useState<boolean>(false);

  return (
    <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <EmailTextField
        email={email}
        setEmail={setEmail}
        errorMessage={
          requiresNonEmptyFields && !email
            ? "Email address cannot be empty"
            : null
        }
      />
      <PasswordTextField
        password={password}
        setPassword={setPassword}
        errorMessage={
          requiresNonEmptyFields && !password
            ? "Password cannot be empty"
            : null
        }
      />

      <Button
        title={"Sign in"}
        onClick={() => {
          setRequiresNonEmptyFields(true);

          if (email && password) {
            signIn({ email, password });
          }
        }}
      />

      <Button
        title={"Sign up"}
        onClick={() => {
          setRequiresNonEmptyFields(true);

          if (email && password) {
            signUp({ email, password });
          }
        }}
      />
    </form>
  );
};
