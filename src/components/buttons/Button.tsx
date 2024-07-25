import type { ReactElement, ReactNode } from "react";
import { Button as MantineButton } from "@mantine/core";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps): ReactElement => {
  return (
    <MantineButton variant={"filled"} onClick={onClick}>
      {children}
    </MantineButton>
  );
};
