import { useMutation } from "react-query";
import {
  LoggedOutPayloadDTO,
  LoggedOutResponse,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_LOGOUT } from "@app/modules";

export const useUserLogoutMutation = () => {
  return useMutation<
    AxiosResponse<LoggedOutResponse>,
    AxiosError,
    LoggedOutPayloadDTO
  >(USER_LOGOUT, (payload) => ApiClient.Auth.authControllerSignOut(payload));
};
