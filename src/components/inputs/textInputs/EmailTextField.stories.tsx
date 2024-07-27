import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { useState } from "react";
import { EmailTextField } from "./EmailTextField";

const EmailTextFieldStory = (): ReactElement => {
  const [email, setEmail] = useState<string>("");
  return <EmailTextField email={email} setEmail={setEmail} />;
};

const meta = {
  component: EmailTextFieldStory,
} satisfies Meta<typeof EmailTextFieldStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EmailTextFieldStory />,
};
