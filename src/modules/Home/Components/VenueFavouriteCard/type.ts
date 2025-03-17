import { BusinessVenueDetailsEntity } from "@gooday_corp/gooday-api-client";
import { ViewStyle } from "react-native";

export type VenueFavouriteCardProps = {
  item: BusinessVenueDetailsEntity;
  width?: ViewStyle['width'];
  onNavigateCb?: () => void,
  style?: ViewStyle
  disabled?: boolean
}