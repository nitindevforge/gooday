import { Role } from "@app/modules";

export type CalendarDefaultLayoutProps = {
  calenderType: 'week' | 'month';
  date: Date;
  role: Role;
  onCalendar: () => void;
};
