import { BusinessVenueDetailsEntity } from "@gooday_corp/gooday-api-client";
import { ViewStyle } from "react-native";

export type VenueDetailsCardProps = {
  item: BusinessVenueDetailsEntity;
  width?: ViewStyle['width'];
  onNavigateCb?: () => void,
  style?: ViewStyle 
}