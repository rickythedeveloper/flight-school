import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { useState } from "react";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";

type TextFieldStoryProps = Omit<TextFieldProps, "value" | "setValue">;

const TextFieldStory = (props: TextFieldStoryProps): ReactElement => {
  const [value, setValue] = useState<string>("");
  return <TextField {...props} value={value} setValue={setValue} />;
};

const meta = {
  component: TextFieldStory,
} satisfies Meta<typeof TextFieldStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: TextFieldStoryProps) => <TextFieldStory {...args} />,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    required: false,
    error: false,
  } satisfies TextFieldStoryProps,
};

export const WithErrorText: Story = {
  render: (args: TextFieldStoryProps) => <TextFieldStory {...args} />,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    required: true,
    error: "Invalid data",
  } satisfies TextFieldStoryProps,
};
