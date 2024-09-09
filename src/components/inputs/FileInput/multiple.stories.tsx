import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { useState } from "react";
import type { FileInputProps } from "./index";
import { FileInput } from "./index";

type MultipleFileInputStoryProps = Omit<
  FileInputProps<true>,
  "value" | "setValue" | "multiple"
>;

const MultipleFileInputStory = (
  props: MultipleFileInputStoryProps,
): ReactElement => {
  const [file, setFile] = useState<File[]>([]);

  return (
    <FileInput {...props} value={file} setValue={setFile} multiple={true} />
  );
};

const meta = {
  component: MultipleFileInputStory,
} satisfies Meta<typeof FileInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Multiple file input",
    placeholder: "Select files",
    fileTypes: ["image/png", "image/jpeg"],
  },
};
