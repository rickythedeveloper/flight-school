import type { Meta, StoryObj } from "@storybook/react";

import { PasswordTextField } from "./PasswordTextField";
import type { ReactElement } from "react";
import { useState } from "react";

const PasswordTextFieldStory = (): ReactElement => {
  const [password, setPassword] = useState<string>("");
  return <PasswordTextField password={password} setPassword={setPassword} />;
};

const meta = {
  component: PasswordTextFieldStory,
} satisfies Meta<typeof PasswordTextFieldStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PasswordTextFieldStory />,
};
