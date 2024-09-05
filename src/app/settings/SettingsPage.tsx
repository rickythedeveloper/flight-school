"use client";

import type { ReactElement } from "react";
import type { ColorScheme } from "@/hooks/useColorScheme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SegmentedControl } from "@/components/segmentedControls/SegmentedControl";

const colorSchemes: { value: ColorScheme; label: string }[] = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "auto",
    label: "Auto",
  },
] as const;

export const SettingsPage = (): ReactElement => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <div>
      <SegmentedControl
        value={colorScheme}
        setValue={setColorScheme}
        options={colorSchemes}
      />
    </div>
  );
};
