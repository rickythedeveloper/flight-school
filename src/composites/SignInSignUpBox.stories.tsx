import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn, userEvent, within } from "@storybook/test";
import { SignInSignUpBox } from "./SignInSignUpBox";
import { typeText } from "@/storybook-utils/typeText";

const meta = {
  component: SignInSignUpBox,
  args: {
    signIn: fn(),
    signUp: fn(),
  },
} satisfies Meta<typeof SignInSignUpBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessfulSignIn: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "example-email@email.com";
    const password = "ExamplePassword";

    await fillForm(canvasElement, emailAddress, password);
    await clickSignIn(canvasElement);

    await expect(args.signIn).toHaveBeenCalledOnce();
    await expect(args.signUp).not.toHaveBeenCalled();
  },
};

export const SuccessfulSignUp: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "example-email@email.com";
    const password = "ExamplePassword";

    await fillForm(canvasElement, emailAddress, password);
    await clickSignUp(canvasElement);

    await expect(args.signIn).not.toHaveBeenCalled();
    await expect(args.signUp).toHaveBeenCalledOnce();
  },
};

export const AttemptSignInWithoutEmail: Story = {
  play: async ({ args, canvasElement }) => {
    const emailAddress = "";
    const password = "ExamplePassword";

    await fillForm(canvasElement, emailAddress, password);
    await clickSignIn(canvasElement);

    await expect(args.signIn).not.toHaveBeenCalled();
    await expect(args.signUp).not.toHaveBeenCalled();

    await assertEmptyEmailTextIsDisplayed(canvasElement);
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

const assertEmptyEmailTextIsDisplayed = async (
  canvasElement: HTMLElement,
): Promise<void> => {
  const canvas = within(canvasElement);

  const errorMessageElement = canvas.getByText(
    "Email address cannot be empty",
    {},
  );

  await expect(errorMessageElement).toBeVisible();
};
