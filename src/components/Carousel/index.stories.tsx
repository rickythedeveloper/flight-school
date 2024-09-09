import type { Meta, StoryObj } from "@storybook/react";

import type { ReactElement } from "react";
import { Carousel } from "./index";

const CarouselWithContent = (): ReactElement => (
  <div style={{ width: "300px" }}>
    <Carousel
      height={150}
      items={[
        {
          key: 1,
          node: <div>Content 1</div>,
        },
        {
          key: 2,
          node: <div>Content 2</div>,
        },
        {
          key: 3,
          node: <div>Content 3</div>,
        },
        {
          key: 4,
          node: <div>Content 4</div>,
        },
        {
          key: 5,
          node: <div>Content 5</div>,
        },
      ]}
    />
  </div>
);

const meta = {
  component: CarouselWithContent,
} satisfies Meta<typeof CarouselWithContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
