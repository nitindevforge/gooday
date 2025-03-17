import { useMutation } from "react-query";
import {
  ResetPasswordPayloadDTO,
  ResetPasswordResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { NEW_PASSWORD } from "@app/modules";

export const useResetPasswordMutation = () => {
  return useMutation<
    AxiosResponse<ResetPasswordResponseDTO>,
    AxiosError,
    ResetPasswordPayloadDTO
  >(NEW_PASSWORD, (payload) =>
    ApiClient.Auth.authControllerResetPassword(payload)
  );
};
