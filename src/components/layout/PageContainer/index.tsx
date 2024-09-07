import type { ReactElement, ReactNode } from "react";
import { Container } from "@mantine/core";

export function PageContainer({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <Container size={"lg"} h={"100%"}>
      <main>{children}</main>
    </Container>
  );
}
