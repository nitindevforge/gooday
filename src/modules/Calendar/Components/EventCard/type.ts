export interface EventsProps {
  onChange: (date: Date) => void;
  events: any;
  date?: Date
  focus: boolean;
}
