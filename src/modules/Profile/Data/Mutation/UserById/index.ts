import { useMutation } from "react-query";
import { GetUserDTO, UserMeDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { FRIENDS_DETAILS } from "@app/modules";

export const useGetUserBuyIdMutation = () => {
  return useMutation<AxiosResponse<UserMeDTO>, AxiosError, GetUserDTO>(
    FRIENDS_DETAILS,
    (payload) =>  ApiClient.Users.usersControllerGetUser(payload),
  );
};
