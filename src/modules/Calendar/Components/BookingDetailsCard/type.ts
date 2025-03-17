import { BookingEntity, EventResponse } from "@gooday_corp/gooday-api-client"

export type BookingDetailsCardProps = {
  data: BookingEntity | EventResponse;
  isBooking?: boolean
}