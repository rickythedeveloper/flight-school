import type { ReactElement } from "react";
import { TextField } from "@/components/inputs/textInputs/TextField";

export interface PasswordTextFieldProps {
  password: string;
  setPassword: (newEmail: string) => void;
  hasError: boolean;
}

export const PasswordTextField = ({
  password,
  setPassword,
  hasError,
}: PasswordTextFieldProps): ReactElement => {
  return (
    <TextField
      label={"Password"}
      value={password}
      setValue={setPassword}
      placeholder={"••••••••"}
      required
      error={hasError}
    />
  );
};
