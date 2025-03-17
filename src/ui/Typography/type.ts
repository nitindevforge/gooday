import { TextProps } from "react-native";

export type TypographyVariant =
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "5xl"
  | "4xl"
  | "xs"
  | "sm"
  | "2xs"
  | "p"
  | "9"
  | "10"
  | "11"
  | "13"
  | "15"
  | "17"
  | "32";

export type TypographyWeight =
  | "extralight"
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy"
  | "black";

export type TypographyColor =
  | "primary-100"
  | "primary-200"
  | "primary-300"
  | "secondary-100"
  | "secondary-200"
  | "secondary-300"
  | "secondary-400"
  | "secondary-500"
  | "secondary-600"
  | "black"
  | "white"
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "dark-red"
  | "dark-m"

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  className?: string;
  styles?: Object;
}
