import type { ReactElement } from "react";
import { TextInput } from "@mantine/core";

interface TextFieldProps {
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  placeholder?: string;
}

export const TextField = ({
  label,
  value,
  setValue,
  placeholder,
}: TextFieldProps): ReactElement => {
  return (
    <TextInput
      label={label}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      placeholder={placeholder}
    />
  );
};
