import { useMutation } from "react-query";
import {
  GoogleOAuthResponseDTO,
  GoogleVerificationPayloadDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_GOOGLE_LOGIN } from "@app/modules";

export const useBusinessGoogleLoginMutation = () => {
  return useMutation<
    AxiosResponse<GoogleOAuthResponseDTO>,
    AxiosError,
    GoogleVerificationPayloadDTO
  >(USER_GOOGLE_LOGIN, async (payload) =>
    ApiClient.Oauth.oAuthControllerValidateGoogleTokenBusiness(payload)
  );
};
