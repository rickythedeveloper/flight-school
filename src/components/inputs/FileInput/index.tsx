import type { ReactElement } from "react";
import { FileInput as MantineFileInput } from "@mantine/core";

type MimeType = "image/jpeg" | "image/png";

export interface FileInputProps<Multiple extends boolean> {
  label: string;
  placeholder: string;
  fileTypes: MimeType[];
  multiple: Multiple;
  value: Multiple extends true ? File[] : File | null;
  setValue: (payload: Multiple extends true ? File[] : File | null) => void;
}

export const FileInput = <Multiple extends boolean>({
  label,
  placeholder,
  fileTypes,
  multiple,
  value,
  setValue,
}: FileInputProps<Multiple>): ReactElement => {
  return (
    <MantineFileInput
      accept={fileTypes.join(",")}
      label={label}
      placeholder={placeholder}
      multiple={multiple}
      value={value}
      onChange={setValue}
    />
  );
};
