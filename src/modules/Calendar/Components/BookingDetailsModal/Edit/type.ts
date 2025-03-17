import { BookingEntity } from "@gooday_corp/gooday-api-client"
import { ModalView } from "../type"

export type BookingEditProps = {
  data: BookingEntity;
  date: Date;
  setDate: (date: Date) => void;
  changeView?: (view: ModalView) => void;
  closeModal?: () => void;
}