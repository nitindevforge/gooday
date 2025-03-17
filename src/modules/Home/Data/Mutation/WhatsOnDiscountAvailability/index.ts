import { useMutation } from "react-query";
import {
  WhatsOnAvailabilityPayloadDTO,
  WhatsOnAvailabilityResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { WHATS_ON_DISCOUNT_AVAILABLE } from "@app/modules";
import { Alert } from "react-native";

export const useWhatsOnDiscountAvailabilityMutation = () => {
  return useMutation<
    AxiosResponse<WhatsOnAvailabilityResponseDTO>,
    AxiosError,
    WhatsOnAvailabilityPayloadDTO
  >(
    WHATS_ON_DISCOUNT_AVAILABLE,
    (payload) => {
      return ApiClient.WhatsOn.whatsOnControllerWhatsOnAvailability(payload);
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
