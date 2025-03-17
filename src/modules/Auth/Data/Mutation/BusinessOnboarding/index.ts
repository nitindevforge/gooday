import { useMutation } from "react-query";
import {
  BusinessOnBoardingDTO,
  BusinessOnBoardingResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_ONBOARDING } from "@app/modules";

export const useBusinessOnboardingMutation = () => {
  return useMutation<
    AxiosResponse<BusinessOnBoardingResponseDTO>,
    AxiosError,
    BusinessOnBoardingDTO
  >(BUSINESS_ONBOARDING, (payload) =>
    ApiClient.Business.businessControllerBusinessOnboarding(payload)
  );
};
