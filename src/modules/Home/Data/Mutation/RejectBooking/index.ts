import { useMutation } from "react-query";
import {
  BookingRequestResponseDTO,
  RejectBookingInvitePayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_EVENTS, REJECT_BOOKING } from "@app/modules";
import { queryClient } from "../../../../../index";

export const useAcceptBookingMutation = () => {
  return useMutation<
    AxiosResponse<BookingRequestResponseDTO>,
    AxiosError,
    RejectBookingInvitePayload
  >(
    REJECT_BOOKING,
    (payload) => {
      return ApiClient.Booking.bookingControllerRejectBookingInvite(payload);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(BOOKING_EVENTS);
      },
    }
  );
};
