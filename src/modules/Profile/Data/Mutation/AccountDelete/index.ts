import { useMutation } from "react-query";
import { OnBoardingResponseDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { ACCOUNT_DELETE } from "@app/modules";

export const useAccountDeleteMutation = () => {
  return useMutation<AxiosResponse<OnBoardingResponseDTO>, AxiosError>(
    ACCOUNT_DELETE,
    () => ApiClient.Users.usersControllerAccountDelete()
  );
};
