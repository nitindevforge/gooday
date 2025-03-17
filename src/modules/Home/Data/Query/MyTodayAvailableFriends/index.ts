import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { FriendsDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { TODAY_FRIENDS_LIST } from "@app/modules";

export const useGetMyTodayAvailableFriends = () => {
  return useQuery<AxiosResponse<FriendsDTO>, AxiosError>(
    [TODAY_FRIENDS_LIST],
    () => ApiClient.Friends.friendControllerTodayAvailableFriends()
  );
};

