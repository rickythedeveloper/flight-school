import type { MantineColor } from "@mantine/core";
import { Text as MantineText } from "@mantine/core";
import type { ReactElement } from "react";

type TextColorType = "standard" | "warning" | "error" | "success";

export interface TextProps {
  children: string;
  colorType?: TextColorType;
  align?: "start" | "end" | "center";
}

export const Text = ({
  children,
  colorType = "standard",
  align,
}: TextProps): ReactElement => {
  const color = getTextColor(colorType);

  return (
    <MantineText size={"sm"} c={color} ta={align}>
      {children}
    </MantineText>
  );
};

const getTextColor = (colorType: TextColorType): MantineColor => {
  switch (colorType) {
    case "standard":
      return "dark";
    case "warning":
      return "orange";
    case "error":
      return "red";
    case "success":
      return "green";
  }
};
