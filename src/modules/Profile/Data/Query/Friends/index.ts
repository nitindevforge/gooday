import { useInfiniteQuery } from "react-query";
import { ApiClient } from "@app/api";
import { FriendsDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { FRIENDS_LIST } from "@app/modules";

export const useGetFriends = (search: string) => {
  const friendControllerFindFriends = (pageParam: number) => {
    return ApiClient.Friends.friendControllerFindFriends(
      Number(pageParam + 1),
      10,
      search,
    );
  };
  return useInfiniteQuery<AxiosResponse<FriendsDTO>, AxiosError>(
    [FRIENDS_LIST, search],
    ({ pageParam = 0 }) => friendControllerFindFriends(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        const users = pages?.reduce(
          (acc: FriendsDTO['data'], page: AxiosResponse<FriendsDTO>) => {
            return [...(acc ?? []), ...(page?.data?.data ?? [])];
          },
          [],
        );
        if (lastPage?.data?.data?.length) {
          return pages?.length;
        }
        return undefined;
      }
    },
  );
};
  