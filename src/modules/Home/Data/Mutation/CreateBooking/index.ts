import { useMutation } from "react-query";
import {
  BookingResponseDTO,
  CreateBookingPayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import {
  BOOKING_EVENTS,
  CALENDAR_LISTING,
  CALENDAR_SLOTS,
  CREATE_BOOKING,
  MANDATE_PAYMENT,
  MY_FRIENDS,
  useGetUser,
  VENUE_LIST,
} from "@app/modules";
import { getBookingTitle } from "@app/utils";
import { useUserBooking } from "@app/common";
import { queryClient } from "../../../../../index";

export const useCreateBookingMutation = (cb?: () => void) => {
  const { booking } = useUserBooking();
  const { data: user } = useGetUser();
  return useMutation<
    AxiosResponse<BookingResponseDTO>,
    AxiosError,
    CreateBookingPayload
  >(
    CREATE_BOOKING,
    (payload) => {
      return ApiClient.Booking?.bookingControllerCreateBooking({
        ...payload,
        title:
          payload?.title ||
          getBookingTitle({
            business: booking?.venueObj?.business,
            user: user?.data?.data!,
          }),
        customers: payload?.customers ?? []
      });
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries(VENUE_LIST);
        queryClient.invalidateQueries(CALENDAR_SLOTS);
        queryClient.invalidateQueries(MY_FRIENDS);
        queryClient.invalidateQueries(CALENDAR_LISTING);
        queryClient.invalidateQueries(MANDATE_PAYMENT);
        if (cb) {
          cb()
        }
      },
    }
  );
};
