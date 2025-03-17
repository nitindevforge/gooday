// type Tab = {
//   name: string;
// }

import { ViewStyle } from "react-native";

export type TabBarProps = {
  onPress: (name: string) => void;
  active: string;
  tabs: Tabs[];
  contentWrapperStyle?: ViewStyle
  renderItem?: React.FC<Tabs> 
  tabStyle?: ViewStyle
};

type Tabs = {
  label: string;
  value: any;
};
