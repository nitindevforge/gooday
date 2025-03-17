import { Moment } from "moment";
import { CalendarProps } from "../Calendar/types";

export type CalendarBottomSheetProps = {
  open: boolean;
  onClose?: () => void;
  onChangeMonth?: (prev?: boolean) => void;
  loading?: boolean;
  slotPeriod?: "month" | "day";
  type?: "start" | "end";
  slotsMonth?: Moment;
  onTimeChange?: (date: string) => void;
  collaborators: string[];
  startDate: string
} & Omit<CalendarProps<T>, "view">;
