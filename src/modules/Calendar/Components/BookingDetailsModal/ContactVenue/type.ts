import { BookingEntity } from "@gooday_corp/gooday-api-client"
import { ModalView } from "../type"

export type ContactVenueProps = {
  data: BookingEntity;
  changeView?: (view: ModalView) => void;
  closeModal?: () => void;
  reset?: () => void;
}