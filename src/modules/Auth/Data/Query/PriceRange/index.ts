import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { PRICE_RANGE } from "@app/modules";
import { PriceRangeListResponse } from "@gooday_corp/gooday-api-client";

export const usePriceRange = () => {
  return useQuery<AxiosResponse<PriceRangeListResponse>, AxiosError>(
    PRICE_RANGE,
    () => ApiClient.Business.businessTypeControllerListPriceRange()
  );
};
