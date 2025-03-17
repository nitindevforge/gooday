import { useMutation } from "react-query";
import {
  LeaveBookingDTO,
  LeaveBookingResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, CREATE_BOOKING, LEAVE_BOOKING } from "@app/modules";
import { queryClient } from "../../../../../index";

export const useLeaveBookingMutation = () => {
  return useMutation<
    AxiosResponse<LeaveBookingResponseDTO>,
    AxiosError,
    LeaveBookingDTO
  >(
    LEAVE_BOOKING,
    (payload) => {
      return ApiClient.Booking.bookingControllerLeaveBooking(payload);
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
