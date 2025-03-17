import { BusinessVenueDTO } from "@gooday_corp/gooday-api-client";
import { VenueState } from "../BusinessDetailsInfoForm";

export type VenueModalFormProps = {
  onClose: () => void;
  handleSetVenue: (venues: BusinessVenueDTO) => void
  venues?: BusinessVenueDTO[]
  updateIndex?: number
};
