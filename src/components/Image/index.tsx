import type { ReactElement } from "react";
import { Image as MantineImage } from "@mantine/core";

export interface ImageProps {
  src: string;
  alt: string;
  height: number;
}

export const Image = ({ src, alt, height }: ImageProps): ReactElement => {
  return <MantineImage fit={"contain"} src={src} alt={alt} h={height} />;
};
