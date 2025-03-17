import { ViewStyle } from "react-native";

export type TodoItemListProps = {
  name: string;
  icon: React.ReactNode
  onPress: () => void;
  style?: ViewStyle
};
