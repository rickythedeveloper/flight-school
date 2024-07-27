import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { useState } from "react";
import { TextField } from "./TextField";

interface TextFieldStoryProps {
  label: string;
  placeholder: string;
}

const TextFieldStory = ({
  label,
  placeholder,
}: TextFieldStoryProps): ReactElement => {
  const [value, setValue] = useState<string>("");
  return (
    <TextField
      value={value}
      setValue={setValue}
      label={label}
      placeholder={placeholder}
    />
  );
};

const meta = {
  component: TextFieldStory,
} satisfies Meta<typeof TextFieldStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <TextFieldStory {...args} />,
  args: {
    label: "Label",
    placeholder: "Placeholder",
  },
};
