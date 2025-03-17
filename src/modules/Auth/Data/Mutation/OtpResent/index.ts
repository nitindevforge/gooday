import { useMutation } from "react-query";
import {
  ForgotPasswordPayloadDTO,
  ForgotPasswordResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_MAIL_VERIFICATION } from "@app/modules";

export const useOtpResentMutation = () => {
  return useMutation<
    AxiosResponse<ForgotPasswordResponseDTO>,
    AxiosError,
    ForgotPasswordPayloadDTO
  >(USER_MAIL_VERIFICATION, (payload) =>
    ApiClient.Auth.authControllerResentOTP(payload)
  );
};
