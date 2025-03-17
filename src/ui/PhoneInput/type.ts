import { TextInputProps } from "react-native";
import { Style } from "tailwind-rn";

export interface PhoneInputProps extends TextInputProps {
  error?: string;
  success?: boolean;
  className?: string;
  label?: string;
  width?: number
  height?: number
  massageStyle?: Style;
  onChangeItem:(value: string, code: string) => void;
}
