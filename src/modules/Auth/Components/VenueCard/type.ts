import { BusinessVenueDetailsEntity } from "@gooday_corp/gooday-api-client";

export type VenueCardProps = {
  venue: BusinessVenueDetailsEntity;
  onDelete?: () => void;
  onEdit?: () => void;
  onPress?: () => void;
};
