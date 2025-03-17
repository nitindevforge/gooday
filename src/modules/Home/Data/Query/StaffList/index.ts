import { useInfiniteQuery } from "react-query";
import { ApiClient } from "@app/api";
import { BusinessStaffsResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { STAFF_LIST } from "@app/modules";

export const useGetBusinessStaffs = (search?: string) => {

  const findBusinessStaffs = (pageParam: number) => {
    return ApiClient.Business.businessStaffControllerFindBusinessStaffs({
      page: Number(pageParam + 1),
      pageSize: 10,
      search: search ?? undefined,
    });
  };
  return useInfiniteQuery<AxiosResponse<BusinessStaffsResponseDTO>, AxiosError>(
    [STAFF_LIST, search],
    ({ pageParam = 0 }) => findBusinessStaffs(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.data?.length) {
          return pages?.length;
        }
        return undefined;
      },
      onError(err) {
      },
    },
  );
};
