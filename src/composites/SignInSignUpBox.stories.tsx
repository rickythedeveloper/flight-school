import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn, userEvent, within } from "@storybook/test";
import { SignInSignUpBox } from "./SignInSignUpBox";
import { typeText } from "@/storybook-utils/typeText";
import { assertTextIsDisplayed } from "@/storybook-utils/assertTextIsDisplayed";

const meta = {
  component: SignInSignUpBox,
  args: {
    signInAction: fn(),
    signUpAction: fn(),
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof SignInSignUpBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessfulSignIn: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "example-email@email.com";
    const password = "ExamplePassword";
    args.signInAction.mockResolvedValue({
      isSuccess: true,
      data: { hasProfile: true },
    });

    await fillForm(canvasElement, emailAddress, password);
    await clickSignIn(canvasElement);

    await expect(args.signInAction).toHaveBeenCalledOnce();
    await expect(args.signUpAction).not.toHaveBeenCalled();
  },
};

export const UnsuccessfulSignIn: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "example-email@email.com";
    const password = "ExamplePassword";
    args.signInAction.mockResolvedValue({ isSuccess: false });

    await fillForm(canvasElement, emailAddress, password);
    await clickSignIn(canvasElement);

    await expect(args.signInAction).toHaveBeenCalledOnce();
    await expect(args.signUpAction).not.toHaveBeenCalled();
    await assertTextIsDisplayed(canvasElement, "Failed to sign in.");
  },
};

export const SuccessfulSignUp: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "example-email@email.com";
    const password = "ExamplePassword";
    args.signUpAction.mockResolvedValue({
      isSuccess: true,
      data: { action: "checkEmail" },
    });

    await fillForm(canvasElement, emailAddress, password);
    await clickSignUp(canvasElement);

    await expect(args.signInAction).not.toHaveBeenCalled();
    await expect(args.signUpAction).toHaveBeenCalledOnce();
  },
};

export const UnsuccessfulSignUp: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "example-email@email.com";
    const password = "ExamplePassword";
    args.signUpAction.mockResolvedValue({ isSuccess: false });

    await fillForm(canvasElement, emailAddress, password);
    await clickSignUp(canvasElement);

    await expect(args.signInAction).not.toHaveBeenCalled();
    await expect(args.signUpAction).toHaveBeenCalledOnce();
    await assertTextIsDisplayed(canvasElement, "Failed to sign up.");
  },
};

export const AttemptSignInWithoutEmail: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "";
    const password = "ExamplePassword";

    await fillForm(canvasElement, emailAddress, password);
    await clickSignIn(canvasElement);

    await expect(args.signInAction).not.toHaveBeenCalled();
    await expect(args.signUpAction).not.toHaveBeenCalled();
    await assertTextIsDisplayed(canvasElement, "Email address cannot be empty");
  },
};

const fillForm = async (
  canvasElement: HTMLElement,
  emailAddress: string,
  password: string,
): Promise<void> => {
  const canvas = within(canvasElement);

  if (emailAddress) {
    const emailInput = canvas.getByLabelText(/^Email/, {
      selector: "input",
    });
    await typeText(emailInput, emailAddress);
  }

  if (password) {
    const passwordInput = canvas.getByLabelText(/^Password/, {
      selector: "input",
    });
    await typeText(passwordInput, password);
  }
};

const clickSignIn = async (canvasElement: HTMLElement): Promise<void> => {
  const canvas = within(canvasElement);

  const signInButton = canvas.getByRole("button", { name: "Sign in" });

  await userEvent.click(signInButton);
};

const clickSignUp = async (canvasElement: HTMLElement): Promise<void> => {
  const canvas = within(canvasElement);

  const signUpButton = canvas.getByRole("button", { name: "Sign up" });

  await userEvent.click(signUpButton);
};
