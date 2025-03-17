import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_DETAILS } from "@app/modules";
import { BookingResponseDTO } from "@gooday_corp/gooday-api-client";

export const useGetBooking = (id: string) => {
  return useQuery<AxiosResponse<BookingResponseDTO>, AxiosError>(BOOKING_DETAILS, () =>
    ApiClient.Booking.bookingControllerGetBooking(id),
    {
      enabled: !!id
    }
  );
};
