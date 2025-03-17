import { TypographyColor } from "../../../../ui/Typography/type";
import { EventTypes } from "@app/modules";

export interface FilterDataProps {
  variant?: 'primary' | 'dashed';
  label: string;
  background: string;
  value: string;
  textColor: TypographyColor;
}
export interface FilterHeaderProps {
  onPress: (text: EventTypes) => void;
  data: FilterDataProps[];
  eventTypes: string[];
}
