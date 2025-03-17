import { TouchableOpacityProps } from "react-native";
import { IconProps, Icons } from "../Icon/type";

type ButtonVariant = "normal" | "outline" | "text" | "dots" | "shadow";

export type ButtonSize = "small" | "normal" | "medium";

export type ButtonColor = "primary" | "secondary" | "white";

export type ButtonRadius = "rounded-18" | "rounded-full" | "rounded-7";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: Icons;
  right?: IconProps;
  loading?: boolean;
  shadow?: boolean;
  className?: string;
  radius?: ButtonRadius;
  textStyles?: boolean;
  iconPosition?: "left" | "right";
  iconProps?: IconProps;
}
