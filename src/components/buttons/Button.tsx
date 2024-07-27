import type { ReactElement, ReactNode } from "react";
import { Button as MantineButton } from "@mantine/core";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export const Button = ({ title, onClick }: ButtonProps): ReactElement => {
  return (
    <MantineButton variant={"filled"} onClick={onClick}>
      {title}
    </MantineButton>
  );
};
