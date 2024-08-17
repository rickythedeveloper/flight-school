import { expect, within } from "@storybook/test";

export const assertTextIsDisplayed = async (
  canvasElement: HTMLElement,
  text: string,
): Promise<void> => {
  const canvas = within(canvasElement);

  const element = canvas.getByText(text, {});

  await expect(element).toBeVisible();
};
