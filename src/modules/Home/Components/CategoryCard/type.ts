import { ViewStyle } from "react-native";

export type CategoryCardProps = {
  title: string;
  bgImage: string;
  onPress?: () => void;
  style?: ViewStyle
};
