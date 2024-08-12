import type { ReactElement } from "react";
import { Button as MantineButton } from "@mantine/core";

interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean
}

export const Button = ({ title, onClick, disabled}: ButtonProps): ReactElement => {
  return (
    <MantineButton variant={"filled"} onClick={onClick} disabled={disabled}>
      {title}
    </MantineButton>
  );
};
