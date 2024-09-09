import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { useState } from "react";
import type { FileInputProps } from "./index";
import { FileInput } from "./index";

type SingleFileInputStoryProps = Omit<
  FileInputProps<false>,
  "value" | "setValue" | "multiple"
>;

const SingleFileInputStory = (
  props: SingleFileInputStoryProps,
): ReactElement => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileInput {...props} value={file} setValue={setFile} multiple={false} />
  );
};

const meta = {
  component: SingleFileInputStory,
} satisfies Meta<typeof FileInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Single file input",
    placeholder: "Select file",
    fileTypes: ["image/jpeg", "image/png"],
  },
};
