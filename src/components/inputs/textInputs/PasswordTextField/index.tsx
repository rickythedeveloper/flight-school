import type { ReactElement } from "react";
import { TextField } from "@/components/inputs/textInputs/TextField";

export interface PasswordTextFieldProps {
  password: string;
  setPassword: (newEmail: string) => void;
  errorMessage: string | null;
}

export const PasswordTextField = ({
  password,
  setPassword,
  errorMessage,
}: PasswordTextFieldProps): ReactElement => {
  return (
    <TextField
      label={"Password"}
      value={password}
      setValue={setPassword}
      placeholder={"••••••••"}
      required
      error={errorMessage ?? false}
    />
  );
};
