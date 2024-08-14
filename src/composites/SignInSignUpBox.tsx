"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { Button } from "@/components/buttons/Button";
import { EmailTextField } from "@/components/inputs/textInputs/EmailTextField";
import { PasswordTextField } from "@/components/inputs/textInputs/PasswordTextField";

import type { AuthCredential } from "@/services/serverAuthService/serverAuthService";

export interface SignInSignUpBoxProps {
  signInAction: (credential: AuthCredential) => void;
  signUpAction: (credential: AuthCredential) => void;
}

export const SignInSignUpBox = ({
  signInAction,
  signUpAction,
}: SignInSignUpBoxProps): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [requiresNonEmptyFields, setRequiresNonEmptyFields] =
    useState<boolean>(false);

  return (
    <>
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
            signInAction({ email, password });
          }
        }}
      />

      <Button
        title={"Sign up"}
        onClick={() => {
          setRequiresNonEmptyFields(true);

          if (email && password) {
            signUpAction({ email, password });
          }
        }}
      />
    </>
  );
};
