import { userEvent } from "@storybook/test";

export const typeText = (element: Element, text: string): Promise<void> => {
  return userEvent.type(element, text, { delay: 30 });
};
