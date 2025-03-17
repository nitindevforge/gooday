export interface CommonCalendarProps<_> {
  onPress?: (data: Date) => void;
  date?: Date;
  disabledDates?: Array<Date>;
  selectedDateFromMonth?: Date
}

export interface MonthlyCalendarPrimaryProps<T> extends CommonCalendarProps<T> {
  view: 'monthly';
  variant: 'primary';
  events: Array<CalendarEvent<T>>;
}

export interface MonthlyCalendarSecondaryProps<T> extends CommonCalendarProps<T> {
  view: 'monthly';
  variant: 'secondary';
  slots: Array<BaseCalendarSlot>;
}

export interface WeeklyCalendarPrimaryProps<T> extends CommonCalendarProps<T> {
  view: 'weekly';
  variant: 'primary';
}

export interface WeeklyCalendarSecondaryProps<T> extends CommonCalendarProps<T> {
  view: 'weekly';
  variant: 'secondary';
  slots: Array<BaseCalendarSlot>;
}

export type CalendarProps<T> = MonthlyCalendarPrimaryProps<T> | MonthlyCalendarSecondaryProps<T> | WeeklyCalendarPrimaryProps<T> |  WeeklyCalendarSecondaryProps<T>;

interface BaseCalendarEvent<Event> {
  startDate: Date;
  endDate: Date;
  renderComponent: (event: CalendarEvent<Event>, index: number, options?: {
    isDisabled?: boolean;
  }) => React.ReactNode;
}

export interface BaseCalendarSlot {
  date: Date;
  slots: Array<{
    start: Date;
    end: Date;
  }>;
}

export type CalendarEvent<Event> = BaseCalendarEvent<Event> & Event;
