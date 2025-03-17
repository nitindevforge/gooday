import { BookingEntity } from "@gooday_corp/gooday-api-client"
import { ModalView } from "../type"

export type BookingEditProps = {
  data: BookingEntity;
  changeView?: (view: ModalView) => void;
  closeModal?: () => void;
  reset?: () => void;
}