import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { useState } from "react";
import type { PasswordTextFieldProps } from "./PasswordTextField";
import { PasswordTextField } from "./PasswordTextField";

type PasswordTextFieldStoryProps = Omit<
  PasswordTextFieldProps,
  "password" | "setPassword"
>;

const PasswordTextFieldStory = (
  props: PasswordTextFieldStoryProps,
): ReactElement => {
  const [password, setPassword] = useState<string>("");
  return (
    <PasswordTextField
      {...props}
      password={password}
      setPassword={setPassword}
    />
  );
};

const meta = {
  component: PasswordTextFieldStory,
} satisfies Meta<typeof PasswordTextFieldStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: PasswordTextFieldStoryProps) => (
    <PasswordTextFieldStory {...args} />
  ),
  args: {
    hasError: false,
  } satisfies PasswordTextFieldStoryProps,
};
