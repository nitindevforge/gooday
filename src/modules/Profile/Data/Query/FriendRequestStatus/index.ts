import { useQuery } from "react-query";
import { FriendshipStatusDTO, FriendshipStatusCheck } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { FRIENDS_REQUEST_STATUS } from "@app/modules";

export const useGetFriendshipStatusMutation = (payload: FriendshipStatusCheck) => {
  return useQuery<AxiosResponse<FriendshipStatusDTO>, AxiosError>(
    FRIENDS_REQUEST_STATUS,
    () =>  ApiClient.Friends.friendControllerGetFriendshipStatus(payload),
    {
      enabled: !!payload?.to
    }
  );
};
