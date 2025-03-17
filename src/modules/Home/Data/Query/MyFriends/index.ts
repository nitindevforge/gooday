import { useInfiniteQuery } from "react-query";
import { ApiClient } from "@app/api";
import { FriendsDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { MY_FRIENDS } from "@app/modules";

export const useGetMyFriends = (search?: string, calendar?: string, userId?: string) => {

  const friendControllerFindFriends = (pageParam: number) => {
    return ApiClient.Friends.friendControllerListMyFriends(
      Number(pageParam + 1),
      10,
      search ?? undefined,
      calendar ?? undefined,
      userId
    );
  };
  return useInfiniteQuery<AxiosResponse<FriendsDTO>, AxiosError>(
    [MY_FRIENDS, search],
    ({ pageParam = 0 }) => friendControllerFindFriends(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.data?.length) {
          return pages?.length;
        }
        return undefined;
      },
    }
  );
};
