import { useMutation } from "react-query";
import {
  NewPasswordPayloadDTO,
  NewPasswordResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { NEW_PASSWORD } from "@app/modules";

export const useNewPasswordMutation = () => {
  return useMutation<
    AxiosResponse<NewPasswordResponseDTO>,
    AxiosError,
    NewPasswordPayloadDTO
  >(NEW_PASSWORD, (payload) =>
    ApiClient.Auth.authControllerCreateNewPassword(payload)
  );
};
