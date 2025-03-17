import { TypographyColor } from "../Typography/type";

export type ProgressBarProps = {
  progress?: number;
  unfilledColor?: string;
  color?: string;
  height?: number;
  borderRadius?: number
  prevProgress?: number
  back?: boolean
  duration?: number
  className?: string
};
