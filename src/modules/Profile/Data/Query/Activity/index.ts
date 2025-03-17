import { ApiClient } from "@app/api";
import { ActivityDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { USER_ACTIVITY } from "@app/modules";

export const useGetActivity = (id: string) => {
  return useQuery<AxiosResponse<ActivityDTO>, AxiosError>(USER_ACTIVITY, () =>
    ApiClient.Users.usersControllerUserActivity(id),
    {
      enabled: !!id
    }
  );
};
