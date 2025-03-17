import { Icons } from "src/ui/Icon/type";

export type IconOtherProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  outline?: boolean;
  round?: boolean;
  variant?: any;
};

export type IconsProps = {
  name: Icons;
} & IconOtherProps;
