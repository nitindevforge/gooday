import { UseQueryOptions, useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { USER_ME } from "@app/modules";
import { UserMeDTO } from "@gooday_corp/gooday-api-client";

export const useGetUser = (
  KEY?: string[],
  options?: Omit<UseQueryOptions<any, any>, "queryKey" | "queryFn">
) => {
  return useQuery<AxiosResponse<UserMeDTO>, AxiosError>(
    KEY ? KEY : USER_ME,
    () => ApiClient.Users.usersControllerGetMe(),
    options
  );
};
