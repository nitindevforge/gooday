import { ApiClient } from "@app/api";
import { WhatsOnResponseDTO, WhatsOnFindDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";
import { WHATS_ON_LIST } from "@app/modules";

export const useGetWhatsOn = (payload?: { venue?: WhatsOnFindDTO['venue'], search?: WhatsOnFindDTO['search'] }) => {
  const whatsOn = (pageParam: number) => {
    return ApiClient.WhatsOn.whatsOnControllerFindWhatsOn(
      {
        page: Number(pageParam + 1),
        pageSize: 10,
        venue: payload?.venue,
        search: payload?.search
      }
    );
  };
  return useInfiniteQuery<AxiosResponse<WhatsOnResponseDTO>, AxiosError>(
    [WHATS_ON_LIST, payload?.venue, payload?.search],
    ({ pageParam = 0 }) => whatsOn(pageParam),
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