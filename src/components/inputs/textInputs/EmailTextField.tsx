import type { ReactElement } from "react";
import { TextField } from "@/components/inputs/textInputs/TextField";

export interface EmailTextFieldProps {
  email: string;
  setEmail: (newEmail: string) => void;
  hasError: boolean;
}

export const EmailTextField = ({
  email,
  setEmail,
  hasError,
}: EmailTextFieldProps): ReactElement => {
  return (
    <TextField
      label={"Email"}
      value={email}
      setValue={setEmail}
      placeholder={"you@example.com"}
      required
      error={hasError}
    />
  );
};
