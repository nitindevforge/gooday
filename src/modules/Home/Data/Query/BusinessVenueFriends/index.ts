import { useInfiniteQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_VENUE_LIST, } from "@app/modules";
import {
  BusinessFavoriteListResponseDTO,
  FindFriendsFavoritesDTO,
} from "@gooday_corp/gooday-api-client";

export const useGetBusinessVenueFriends = (query?: FindFriendsFavoritesDTO) => {
  return useInfiniteQuery<AxiosResponse<BusinessFavoriteListResponseDTO>, AxiosError>(
    [BUSINESS_VENUE_LIST, query],
    ({ pageParam = 0 }) =>
      ApiClient.Business.businessTypeControllerFindFriendsFavoriteBusinessVenueList({
        page: pageParam + 1,
        limit: 10,
        ...query!,
      }),

    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.statusCode && lastPage?.data?.data?.length) {
          return pages.length;
        }
        return undefined;
      },
    }
  );
};
