import { useMutation } from "react-query";
import { OnBoardingResponseDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { ACCOUNT_DEACTIVATE } from "@app/modules";

export const useAccountDeactivateMutation = () => {
  return useMutation<AxiosResponse<OnBoardingResponseDTO>, AxiosError>(
    ACCOUNT_DEACTIVATE,
    () =>  ApiClient.Users.usersControllerDeactivateAccount(),
  );
};
