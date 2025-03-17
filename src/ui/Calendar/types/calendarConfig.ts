export interface CalendarDate {
  date: string;
  monthType: 'previous' | 'next' | 'current';
  day: string;
}

export type CalendarDates = Array<CalendarDate>;