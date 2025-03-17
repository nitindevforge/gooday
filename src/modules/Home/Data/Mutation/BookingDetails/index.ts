import { useMutation } from "react-query";
import { BookingResponseDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_DETAILS } from "@app/modules";

export const useBookingDetailsMutation = () => {
  return useMutation<
    AxiosResponse<BookingResponseDTO>,
    AxiosError,
    { id: string }
  >(
    BOOKING_DETAILS,
    (payload) => {
      return ApiClient.Booking.bookingControllerGetBooking(payload.id);
    }
  );
};
