import { useMutation } from "react-query";
import {
  ForgotPasswordPayloadDTO,
  ForgotPasswordResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { FORGOT_PASSWORD } from "@app/modules";

export const useForgotPasswordMutation = () => {
  return useMutation<
    AxiosResponse<ForgotPasswordResponseDTO>,
    AxiosError,
    ForgotPasswordPayloadDTO
  >(FORGOT_PASSWORD, (payload) =>
    ApiClient.Auth.authControllerForgotPassword(payload)
  );
};
