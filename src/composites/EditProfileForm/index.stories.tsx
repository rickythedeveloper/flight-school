import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn, userEvent, within } from "@storybook/test";
import { EditProfileForm } from "./index";
import { typeText } from "@/storybook-utils/typeText";

const meta = {
  component: EditProfileForm,
  args: {
    saveProfile: fn(),
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof EditProfileForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SaveWithFirstAndLastName: Story = {
  play: async ({ args, canvasElement }) => {
    args.saveProfile.mockResolvedValue({ isSuccess: true });

    const firstNameInput = getFirstNameInput(canvasElement);
    const lastNameInput = getLastNameInput(canvasElement);
    const saveButton = getSaveButton(canvasElement);

    await typeText(firstNameInput, "First");
    await typeText(lastNameInput, "Last");

    await userEvent.click(saveButton);

    await expect(args.saveProfile).toHaveBeenCalledWith({
      firstName: "First",
      lastName: "Last",
    });
  },
};

export const AttemptSaveWithoutLastName: Story = {
  play: async ({ args, canvasElement }) => {
    args.saveProfile.mockResolvedValue({ isSuccess: true });

    const firstNameInput = getFirstNameInput(canvasElement);
    const saveButton = getSaveButton(canvasElement);

    await typeText(firstNameInput, "First");

    await userEvent.click(saveButton);

    await expect(args.saveProfile).not.toHaveBeenCalled();
  },
};

export const AttemptSaveWithoutFirstName: Story = {
  play: async ({ args, canvasElement }) => {
    args.saveProfile.mockResolvedValue({ isSuccess: true });

    const lastNameInput = getLastNameInput(canvasElement);
    const saveButton = getSaveButton(canvasElement);

    await typeText(lastNameInput, "Last");

    await userEvent.click(saveButton);

    await expect(args.saveProfile).not.toHaveBeenCalled();
  },
};

const getFirstNameInput = (canvasElement: HTMLElement): HTMLElement => {
  const canvas = within(canvasElement);
  return canvas.getByLabelText("First Name *", {
    selector: "input",
  });
};

const getLastNameInput = (canvasElement: HTMLElement): HTMLElement => {
  const canvas = within(canvasElement);
  return canvas.getByLabelText("Last Name *", {
    selector: "input",
  });
};

const getSaveButton = (canvasElement: HTMLElement): HTMLElement => {
  const canvas = within(canvasElement);
  return canvas.getByRole("button", { name: "Save" });
};
