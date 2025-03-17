import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { UserSyncDTO, UserMeDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { USER_LOCATION } from "@app/modules";

export const useUserLocationMutation = () => {
  return useMutation<AxiosResponse<UserMeDTO>, AxiosError, UserSyncDTO>(
    USER_LOCATION,
    (location) => ApiClient.Users?.usersControllerSyncUserInfo(location)
  );
};
