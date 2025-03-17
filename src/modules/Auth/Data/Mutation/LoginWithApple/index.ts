import { useMutation } from "react-query";
import {
  AppleOAuthResponseDTO,
  AppleVerificationPayloadDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_APPLE_LOGIN } from "@app/modules";

export const useAppleLoginMutation = () => {
  return useMutation<
    AxiosResponse<AppleOAuthResponseDTO>,
    AxiosError,
    AppleVerificationPayloadDTO
  >(USER_APPLE_LOGIN, async (payload) => {
    return ApiClient.Oauth.oAuthControllerValidateAppleToken(payload);
  });
};
