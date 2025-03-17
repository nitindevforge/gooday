import { BusinessEntity, BusinessVenueDetailsEntity, WhatsOnEntity } from "@gooday_corp/gooday-api-client";
import { ViewStyle } from "react-native";

export type WhatsOnCardProps = {
  item: WhatsOnEntity & {
    image?: string;
    whatsOn?: WhatsOnEntity;
    business: BusinessEntity;
    venue?: BusinessVenueDetailsEntity
  };
  width?: ViewStyle['width'];
  onNavigateCb?: () => void,
  style?: ViewStyle
  disabled?: boolean
}