import { useMutation } from "react-query";
import {
  BusinessVenueTimingPayload,
  BusinessOnBoardingResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_TIMING } from "@app/modules";

export const useBusinessTimingMutation = () => {
  return useMutation<
    AxiosResponse<BusinessOnBoardingResponseDTO>,
    AxiosError,
    BusinessVenueTimingPayload
  >(BUSINESS_TIMING, (payload) =>
    ApiClient.Business.businessControllerUpdateBusinessVenueTiming(payload)
  );
};
