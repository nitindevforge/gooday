import { useMutation } from "react-query";
import {
  PrepaidServiceAvailabilityPayloadDTO,
  PrepaidServiceAvailabilityResponseDTO
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { PREPAID_SERVICE_AVAILABLE } from "@app/modules";
import { Alert } from "react-native";

export const usePrepaidServiceAvailabilityMutation = () => {
  return useMutation<
    AxiosResponse<PrepaidServiceAvailabilityResponseDTO>,
    AxiosError,
    PrepaidServiceAvailabilityPayloadDTO
  >(
    PREPAID_SERVICE_AVAILABLE,
    (payload) => {
      return ApiClient.PrepaidService.prepaidServiceControllerPrepaidServiceAvailability(payload);
    },
    {
      onError: (error) => {
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
