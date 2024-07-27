import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { useState } from "react";
import type { EmailTextFieldProps } from "./EmailTextField";
import { EmailTextField } from "./EmailTextField";

type EmailTextFieldStoryProps = Omit<EmailTextFieldProps, "email" | "setEmail">;

const EmailTextFieldStory = (props: EmailTextFieldStoryProps): ReactElement => {
  const [email, setEmail] = useState<string>("");
  return <EmailTextField {...props} email={email} setEmail={setEmail} />;
};

const meta = {
  component: EmailTextFieldStory,
} satisfies Meta<typeof EmailTextFieldStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <EmailTextFieldStory {...args} />,
  args: {
    hasError: false,
  } satisfies EmailTextFieldStoryProps,
};
