import { BookingEntity } from "@gooday_corp/gooday-api-client"
import { ModalView } from "../type"

export type TimeProps = {
  data: BookingEntity & {
    from: string;
    to: string;
    date: string;
  };
  date: Date;
  changeView?: (view: ModalView) => void;
  closeModal?: () => void;
  reset?: () => void;
}