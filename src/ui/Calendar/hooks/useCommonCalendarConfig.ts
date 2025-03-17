import { getCalendarDates, getCalendarDatesForWeeks } from "../utils";

interface CommonCalendarConfigProps {
  date?: Date;
  variant: 'primary' | 'secondary';
  selectedDateFromMonth?: Date
}

export const useCommonCalendarConfig = ({
  date,
  variant,
  selectedDateFromMonth
}: CommonCalendarConfigProps) => {
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'Sa', 'Su'];
  const selectedDate = date ? new Date(date) : new Date();
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  const snapInterval = variant === 'primary' ? 61 : 60;

  const getItemLayout = (_: any, index: number) => ({
    length: snapInterval,
    offset: snapInterval * index,
    index,
  });

  const calendarDates = getCalendarDates(selectedDate);
  const calendarDatesForWeeks = getCalendarDatesForWeeks(selectedDateFromMonth || new Date());

  return {
    daysOfWeek,
    calendarDates,
    snapInterval,
    getItemLayout,
    calendarDatesForWeeks,
  }
}