import { DatePickerProps } from "react-native-date-picker";

export interface DatePickerModelProps extends DatePickerProps {
  onClose?: () => void;
  onSubmit?: () => void;
}
