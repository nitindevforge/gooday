import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_LIST } from "@app/modules";
import { BusinessTypeListResponse } from "@gooday_corp/gooday-api-client";

export const useBusinessType = (favorite: boolean = false) => {
  return useQuery<AxiosResponse<BusinessTypeListResponse>, AxiosError>(
    BUSINESS_LIST,
    () => ApiClient.Business.businessTypeControllerListBusinessType(favorite)
  );
};
