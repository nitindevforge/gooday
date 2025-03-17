import { BaseCalendarSlot } from "../../types";

export type SecondaryDayComponentProps = {
  item: Date;
  isDisabled: boolean;
  onPress?: (data: Date) => void;
  isSelected?: boolean;
  hasSlotsToday?: boolean;
  slots?: BaseCalendarSlot['slots'],
}
