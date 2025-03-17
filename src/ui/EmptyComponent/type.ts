import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export type EmptyComponentProps = {
  massage?: string;
  style?: ViewStyle;
  children?: () => ReactNode;
};
