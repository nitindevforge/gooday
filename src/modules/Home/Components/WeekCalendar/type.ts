
import { ViewStyle } from "react-native";



export type WeekCalendarProps = {
  today: string;
  setToday: (today: string) => void;
  onDayChange?: (today: string) => void;
  dayCard?: React.FC<DayCardProps>
  dayLimit?: number,
  style?: ViewStyle
  changeWeek?: boolean
}

export type DayCardProps = {
  active: boolean;
  day: string;
  index: number;
  onPress: () => void;
};
