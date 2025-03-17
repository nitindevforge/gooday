export type WeekDayComponentProps = {
  item: Date;
  isDisabled: boolean;
  onPress?: (data: Date) => void;
  isSelected?: boolean;
}
