import { ApiClient } from "@app/api";
import { PrepaidServiceFindDTO, PrepaidServiceResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";
import { PREPAID_SERVICE_LIST } from "@app/modules";

export const useGetPrepaidService = (payload?: { venue: PrepaidServiceFindDTO['venue'], category?: PrepaidServiceFindDTO['category'] }) => {
  const prepaidService = (pageParam: number) => {
    return ApiClient.PrepaidService.prepaidServiceControllerFindService(
      {
        page: Number(pageParam + 1),
        pageSize: 10,
        venue: payload?.venue,
        category: payload?.category
      }
    );
  };
  return useInfiniteQuery<AxiosResponse<PrepaidServiceResponseDTO>, AxiosError>(
    [PREPAID_SERVICE_LIST, payload?.venue, payload?.category],
    ({ pageParam = 0 }) => prepaidService(pageParam),
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