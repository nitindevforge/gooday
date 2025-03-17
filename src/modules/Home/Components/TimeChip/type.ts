import { SlideComponentProps } from "@app/ui";
import { CalendarSlots } from "@gooday_corp/gooday-api-client";
import { ViewStyle } from "react-native";

export type TimeChipProps = {
  slide: TimeChipState;
  date?: CalendarSlots['start']
  style?: ViewStyle;
  slot?: CalendarSlots['start']
  hasConflict?: boolean;
  disable?: boolean;
  onPress?: (slot: CalendarSlots) => {};
} & SlideComponentProps;

export type TimeChipState = {
  time: string;
  available?: boolean;
} & CalendarSlots;
