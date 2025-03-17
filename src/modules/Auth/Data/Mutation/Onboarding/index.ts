import {  useMutation } from "react-query";
import {
  OnBoardingResponseDTO,
  OnBoardingDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { ASSISTANT_ME, USER_ONBOARDING } from "@app/modules";
import { queryClient } from "../../../../../index";

export const useUserOnboardingMutation = () => {
  return useMutation<
    AxiosResponse<OnBoardingResponseDTO>,
    AxiosError,
    OnBoardingDTO
  >(USER_ONBOARDING, (payload) =>
    ApiClient.Users.usersControllerOnBoarded(payload), 
  {
    onSuccess(data) {
      queryClient?.invalidateQueries(ASSISTANT_ME)
    },
  }
  );
};
