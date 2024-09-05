import { useMantineColorScheme } from "@mantine/core";

export type ColorScheme = "light" | "dark" | "auto";

export const useColorScheme = (): {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
} => {
  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  return { colorScheme, setColorScheme };
};
