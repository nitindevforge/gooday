import { BaseCalendarSlot } from "../../types";

export type WeekDaySlotsProps = {
  item: Date;
  isDisabled: boolean;
  onPress?: (data: Date) => void;
  isSelected?: boolean;
  slots?: BaseCalendarSlot['slots'],
}
