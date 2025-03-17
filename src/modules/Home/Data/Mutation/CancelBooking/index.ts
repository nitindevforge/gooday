import { useMutation } from "react-query";
import {
  CancelBookingDTO,
  CancelBookingResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, CANCEL_BOOKING } from "@app/modules";
import { queryClient } from "../../../../../index";

export const useCancelBookingMutation = () => {
  return useMutation<
    AxiosResponse<CancelBookingResponseDTO>,
    AxiosError,
    CancelBookingDTO
  >(
    CANCEL_BOOKING,
    (payload) => {
      return ApiClient.Booking.bookingControllerCancelBooking(payload);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST]);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
      },
    }
  );
};
