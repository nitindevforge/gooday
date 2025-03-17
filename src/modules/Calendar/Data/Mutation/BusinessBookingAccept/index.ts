import { ApiClient } from "@app/api";
import {
  BookingConfirmPayload,
  CustomerBookingResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_ACCEPT, BOOKING_EVENTS_LIST } from "@app/modules";

export const useManageBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CustomerBookingResponseDTO>,
    AxiosError,
    BookingConfirmPayload
  >(
    BOOKING_EVENTS_ACCEPT,
    (payload) =>
      ApiClient.Booking.bookingControllerBookingConfirmation(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST]);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
      },
    }
  );
};