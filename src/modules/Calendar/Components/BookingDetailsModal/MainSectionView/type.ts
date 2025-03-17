import { BookingEntity } from "@gooday_corp/gooday-api-client"
import { ModalView } from "../type"

export type MainSectionProps = {
  data: BookingEntity;
  changeView?: (view: ModalView) => void;
  closeModal?: () => void;
}