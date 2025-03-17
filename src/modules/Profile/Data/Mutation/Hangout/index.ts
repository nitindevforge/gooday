import { useMutation } from "react-query";
import { UserHangout, UserMeDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { ACCOUNT_HANGOUT } from "@app/modules";

export const useHangoutMutation = () => {
  return useMutation<AxiosResponse<UserMeDTO>, AxiosError, UserHangout>(
    ACCOUNT_HANGOUT,
    (payload) => ApiClient.Users.usersControllerUserHangout(payload),
  );
};
