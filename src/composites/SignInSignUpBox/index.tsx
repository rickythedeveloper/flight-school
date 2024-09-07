"use client";

import type { ReactElement } from "react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { EmailTextField } from "@/components/inputs/textInputs/EmailTextField";
import { PasswordTextField } from "@/components/inputs/textInputs/PasswordTextField";

import type { SignInAction } from "@/serverActions/authentication/signInAction";
import type { SignUpAction } from "@/serverActions/authentication/signUpAction";
import { Text } from "@/components/typography/Text";
import { pathService } from "@/services/pathService/injection";

export interface SignInSignUpBoxProps {
  signInAction: SignInAction;
  signUpAction: SignUpAction;
}

export const SignInSignUpBox = ({
  signInAction,
  signUpAction,
}: SignInSignUpBoxProps): ReactElement => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [requiresNonEmptyFields, setRequiresNonEmptyFields] =
    useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }, []);

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
        onClick={async () => {
          clearMessages();
          setRequiresNonEmptyFields(true);

          if (email && password) {
            const result = await signInAction({ email, password });

            if (result.isSuccess) {
              setSuccessMessage("Logging in...");

              const newUrl = result.data.hasProfile
                ? pathService.profile.url
                : pathService.profile.edit.url;
              router.push(newUrl);
            } else {
              setErrorMessage("Failed to sign in.");
            }
          }
        }}
      />

      <Button
        title={"Sign up"}
        onClick={async () => {
          clearMessages();
          setRequiresNonEmptyFields(true);

          if (email && password) {
            const result = await signUpAction({ email, password });

            if (result.isSuccess) {
              setSuccessMessage("Please check your email to confirm sign up.");
            } else {
              setErrorMessage("Failed to sign up.");
            }
          }
        }}
      />

      {errorMessage && <Text colorType={"error"}>{errorMessage}</Text>}
      {successMessage && <Text colorType={"success"}>{successMessage}</Text>}
    </>
  );
};
