import type { Meta, StoryObj } from "@storybook/react";

import { expect, fn, userEvent, within } from "@storybook/test";
import type { ReactElement } from "react";
import { EditProfileForm } from "./EditProfileForm";
import { typeText } from "@/storybook-utils/typeText";

const saveProfile = fn<[{ firstName: string; lastName: string }], void>();

const EditProfileFormStory = (): ReactElement => (
  <EditProfileForm saveProfile={saveProfile} />
);

const meta = {
  component: EditProfileFormStory,
} satisfies Meta<typeof EditProfileFormStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SaveWithFirstAndLastName: Story = {
  play: async ({ canvasElement }) => {
    saveProfile.mockResolvedValue();

    const firstNameInput = getFirstNameInput(canvasElement);
    const lastNameInput = getLastNameInput(canvasElement);
    const saveButton = getSaveButton(canvasElement);

    await typeText(firstNameInput, "First");
    await typeText(lastNameInput, "Last");

    await userEvent.click(saveButton);

    await expect(saveProfile).toHaveBeenCalledWith({
      firstName: "First",
      lastName: "Last",
    });
  },
};

export const AttemptSaveWithoutLastName: Story = {
  play: async ({ canvasElement }) => {
    saveProfile.mockResolvedValue();

    const firstNameInput = getFirstNameInput(canvasElement);
    const saveButton = getSaveButton(canvasElement);

    await typeText(firstNameInput, "First");

    await userEvent.click(saveButton);

    await expect(saveProfile).not.toHaveBeenCalled();
  },
};

export const AttemptSaveWithoutFirstName: Story = {
  play: async ({ canvasElement }) => {
    saveProfile.mockResolvedValue();

    const lastNameInput = getLastNameInput(canvasElement);
    const saveButton = getSaveButton(canvasElement);

    await typeText(lastNameInput, "Last");

    await userEvent.click(saveButton);

    await expect(saveProfile).not.toHaveBeenCalled();
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
