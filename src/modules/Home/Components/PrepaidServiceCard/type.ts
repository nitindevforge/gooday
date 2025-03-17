import { BusinessVenueDetailsEntity, PrepaidServiceEntity } from "@gooday_corp/gooday-api-client";
import { ViewStyle } from "react-native";

export type PrepaidServiceCardProps = {
  item: PrepaidServiceEntity & {
    image?: string;
    venue?: BusinessVenueDetailsEntity
  };
  width?: ViewStyle['width'];
  onNavigateCb?: () => void,
  style?: ViewStyle
}