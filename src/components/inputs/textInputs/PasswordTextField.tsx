import type { ReactElement } from "react";
import { TextField } from "@/components/inputs/textInputs/TextField";

interface PasswordTextField {
  password: string;
  setPassword: (newEmail: string) => void;
}

export const PasswordTextField = ({
  password,
  setPassword,
}: PasswordTextField): ReactElement => {
  return (
    <TextField
      label={"Password"}
      value={password}
      setValue={setPassword}
      placeholder={"••••••••"}
    />
  );
};
