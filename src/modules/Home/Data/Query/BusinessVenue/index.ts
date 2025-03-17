import { useInfiniteQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { VENUE_LIST } from "@app/modules";
import {
  BusinessVenueResponseDTO,
  GetBusinessVenueDto,
} from "@gooday_corp/gooday-api-client";

export const useGetBusinessVenue = (query?: GetBusinessVenueDto, enabled: boolean = true) => {
  return useInfiniteQuery<AxiosResponse<BusinessVenueResponseDTO>, AxiosError>(
    [VENUE_LIST, query],
    ({ pageParam = 0 }) =>
      ApiClient.Business.businessTypeControllerGetBusinessVenue({
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
      enabled: enabled,
      retry: 0
    }
  );
};
