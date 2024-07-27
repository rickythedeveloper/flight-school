import "@/app/globals.css";
import "@mantine/core/styles.css";
import type { Preview } from "@storybook/react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { theme } from "@/theme";

import { useEffect } from "react";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";

const channel = addons.getChannel();

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme();
  const handleColorScheme = (value: boolean) =>
    setColorScheme(value ? "dark" : "light");

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
  }, [channel]);

  return <>{children}</>;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (renderStory: any) => (
      <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
    ),
    (renderStory: any) => (
      <MantineProvider theme={theme}>{renderStory()}</MantineProvider>
    ),
  ],
};

export default preview;
