import { useMutation, useQueryClient } from "react-query";
import {
  RescheduleBookingPayload,
  BookingResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, BOOKING_UPDATE } from "@app/modules";
import { Alert } from "react-native";

export const useRescheduleBookingMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<BookingResponseDTO>,
    AxiosError,
    RescheduleBookingPayload
  >(
    BOOKING_UPDATE,
    (payload) => ApiClient.Booking.bookingControllerRescheduleBooking(id, payload),
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
