import { BookingEntity } from "@gooday_corp/gooday-api-client";
import { AllEvent } from "../../Containers";

export type BookingDetailModalProps = {
  data: AllEvent;
};

export type ModalView = 'mainSection' | 'details' | 'edit' | 'time' | 'cancel-booking' | 'contact-venue' | 'event-edit'