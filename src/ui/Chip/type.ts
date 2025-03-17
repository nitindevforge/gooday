import { ViewStyle } from "react-native";
import { TypographyColor } from "../Typography/type";
import { ReactNode } from "react";

export interface ChipProps {
  variant?: "primary" | "dashed";
  onPress: () => void;
  label: string;
  background?: string;
  textColor?: TypographyColor;
  styles?: ViewStyle;
  rightIcon?: () => ReactNode;
}
