import { FC, RefObject } from "react";
import { ScrollView, ViewStyle } from "react-native";

export type ActivityTrackerProps = {
  rowLimit?: number;
  data: any[];
  activityComponent?: FC<{ rowData: any; index: number }>;
  scrollElement?: RefObject<ScrollView>;
  hideCompletedLine?: boolean;
  trackLineHeight?: number;
  componentStyle?: ViewStyle;
};

export type ActivityTrackerState = {
  title: string;
  completed?: boolean;
  active?: boolean;
};
