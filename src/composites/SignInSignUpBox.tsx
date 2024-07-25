"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { Button } from "@/components/buttons/Button";
import { EmailTextField } from "@/components/inputs/textInputs/EmailTextField";
import { PasswordTextField } from "@/components/inputs/textInputs/PasswordTextField";

export interface AuthenticationCredential {
  email: string;
  password: string;
}

interface SignInSignUpBoxProps {
  signIn: (credential: AuthenticationCredential) => void;
  signUp: (credential: AuthenticationCredential) => void;
}

export const SignInSignUpBox = ({
  signIn,
  signUp,
}: SignInSignUpBoxProps): ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
      <EmailTextField email={email} setEmail={setEmail} />
      <PasswordTextField password={password} setPassword={setPassword} />

      <Button
        onClick={() => {
          signIn({ email, password });
        }}
      >
        Sign In
      </Button>

      <Button
        onClick={() => {
          signUp({ email, password });
        }}
      >
        Sign Up
      </Button>
    </form>
  );
};
