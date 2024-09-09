import type { Meta, StoryObj } from "@storybook/react";

import { CreateSchoolForm } from "./index";

const meta = {
  component: CreateSchoolForm,
} satisfies Meta<typeof CreateSchoolForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
