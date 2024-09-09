import type { ReactElement, ReactNode } from "react";
import { Carousel as MantineCarousel } from "@mantine/carousel";

export interface CarouselProps {
  items: { node: ReactNode; key: string | number }[];
  height: number;
}

export const Carousel = ({ items, height }: CarouselProps): ReactElement => {
  return (
    <MantineCarousel
      withControls
      withIndicators
      height={height}
      slideSize={{
        base: "85%",
        xs: "70%",
        sm: "50%",
        md: "30%",
      }}
      slideGap={"sm"}
    >
      {items.map((item) => (
        <MantineCarousel.Slide key={item.key}>
          {item.node}
        </MantineCarousel.Slide>
      ))}
    </MantineCarousel>
  );
};
