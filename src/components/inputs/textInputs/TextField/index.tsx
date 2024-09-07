import type { ReactElement } from "react";
import { TextInput as MantineTextField } from "@mantine/core";

export interface TextFieldProps {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: boolean | string;
}

export const TextField = ({
  label,
  value,
  setValue,
  placeholder,
  required = false,
  error,
}: TextFieldProps): ReactElement => {
  return (
    <MantineTextField
      label={label}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      placeholder={placeholder}
      required={required}
      error={error}
    />
  );
};
