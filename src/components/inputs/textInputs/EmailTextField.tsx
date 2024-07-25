import type { ReactElement } from "react";
import { TextField } from "@/components/inputs/textInputs/TextField";

interface EmailTextFieldProps {
  email: string;
  setEmail: (newEmail: string) => void;
}

export const EmailTextField = ({
  email,
  setEmail,
}: EmailTextFieldProps): ReactElement => {
  return (
    <TextField
      label={"Email"}
      value={email}
      setValue={setEmail}
      placeholder={"you@example.com"}
    />
  );
};
