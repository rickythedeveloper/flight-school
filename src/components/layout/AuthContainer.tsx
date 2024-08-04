import type { ReactElement, ReactNode } from "react";
import { Center, Container } from "@mantine/core";

export function AuthContainer({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <Container size={"xs"} h={"100%"}>
      <Center h={"100%"} w={"100%"}>
        {children}
      </Center>
    </Container>
  );
}
