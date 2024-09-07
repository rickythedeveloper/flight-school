import { Stack as MantineStack } from "@mantine/core";
import type { CSSProperties, ReactElement, ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
}

export function Stack({ children, align, justify }: StackProps): ReactElement {
  return (
    <MantineStack align={align} justify={justify} gap={"sm"}>
      {children}
    </MantineStack>
  );
}
