import { ReactNode } from "react";
import { TextInputProps, TextStyle, ViewStyle } from "react-native";
import { Style } from "tailwind-rn";

export interface InputProps extends TextInputProps {
  error?: string;
  success?: boolean;
  className?: string;
  label?: string;
  right?: ReactNode;
  left?: ReactNode;
  width?: number;
  height?: number;
  massageStyle?: TextStyle;
  contentWrapperStyle?: ViewStyle;
}
