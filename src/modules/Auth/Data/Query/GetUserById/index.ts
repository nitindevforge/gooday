import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_ME_BY_ID } from "@app/modules";
import { UserMeDTO } from "@gooday_corp/gooday-api-client";

export const useGetUserByID = (id: string) => {
  return useQuery<AxiosResponse<UserMeDTO>, AxiosError>(USER_ME_BY_ID, () =>
    ApiClient.Users.usersControllerGetUser({
      id: id,
    })
  );
};
