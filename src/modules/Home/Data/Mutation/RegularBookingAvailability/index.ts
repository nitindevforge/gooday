import { useMutation } from "react-query";
import {
  RegularBookingAvailabilityPayloadDTO,
  RegularBookingAvailabilityResponseDTO
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_AVAILABLE } from "@app/modules";
import { Alert } from "react-native";

export const useRegularBookingAvailabilityMutation = (cb?: () => void) => {
  return useMutation<
    AxiosResponse<RegularBookingAvailabilityResponseDTO>,
    AxiosError,
    RegularBookingAvailabilityPayloadDTO
  >(
    BOOKING_AVAILABLE,
    (payload) => {
      return ApiClient.Booking.bookingControllerRegularBookingAvailability(payload);
    },
    {
      onError: (error) => {
        cb!()
        Alert.alert(
          "Error",
          error.response?.data?.message ??
          error.message ??
          "Something went wrong!!!"
        );
      }
    }
  );
};
