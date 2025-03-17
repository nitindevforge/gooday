import { BookingEntity, EventResponse } from "@gooday_corp/gooday-api-client";
import { ViewStyle } from "react-native";

export type EventDetailsCardProps = {
  item: EventResponse & BookingEntity;
  width?: ViewStyle['width'];
  style?: ViewStyle
  disabled?: boolean
}