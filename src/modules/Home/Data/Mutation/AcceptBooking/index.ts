import { useMutation } from "react-query";
import {
  AcceptBookingInvitePayload,
  BookingRequestResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { ACCEPT_BOOKING, BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST } from "@app/modules";
import { queryClient } from "../../../../../index";

export const useAcceptBookingMutation = () => {
  return useMutation<
    AxiosResponse<BookingRequestResponseDTO>,
    AxiosError,
    AcceptBookingInvitePayload
  >(
    ACCEPT_BOOKING,
    (payload) => {
      return ApiClient.Booking.bookingControllerAcceptBookingInvite(payload);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST])
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
      },
    }
  );
};
