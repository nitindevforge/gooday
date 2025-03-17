import { useInfiniteQuery } from "react-query";
import { ApiClient } from "@app/api";
import { WhatsOnFavoriteListResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { WHATS_ON_FAVORITE_LIST } from "@app/modules";

export const useWhatsOnFavoriteList = () => {
  const findFriendsFavorite = (pageParam: number) => {
    return ApiClient.WhatsOn.whatsOnControllerFindFavoriteWhatsOnList(
      Number(pageParam + 1),
      10,
    );
  };
  return useInfiniteQuery<AxiosResponse<WhatsOnFavoriteListResponseDTO>, AxiosError>(
    [WHATS_ON_FAVORITE_LIST],
    ({ pageParam = 0 }) => findFriendsFavorite(pageParam),
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
