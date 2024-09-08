import type { ReactElement } from "react";
import { Button as MantineButton } from "@mantine/core";

interface ButtonProps {
  title: string;
  disabled: boolean;
}

export const FormButton = ({ title, disabled }: ButtonProps): ReactElement => {
  return (
    <MantineButton variant={"filled"} disabled={disabled} type={"submit"}>
      {title}
    </MantineButton>
  );
};
