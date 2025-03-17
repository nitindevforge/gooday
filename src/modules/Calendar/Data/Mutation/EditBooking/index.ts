import { useMutation, useQueryClient } from "react-query";
import {
  CreateBookingPayload,
  BookingResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, BOOKING_UPDATE } from "@app/modules";
import { Alert } from "react-native";

export const useEditBookingMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<BookingResponseDTO>,
    AxiosError,
    CreateBookingPayload
  >(
    BOOKING_UPDATE,
    (payload) => ApiClient.Booking.bookingControllerUpdateBooking(id, payload),
    {
      onSuccess: () => {
        queryClient.refetchQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST]);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
      },
      onError: (error) => {
        Alert.alert("Error", error?.response?.data?.message)
      }
    }
  );
};
