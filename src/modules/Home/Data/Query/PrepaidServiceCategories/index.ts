import { ApiClient } from "@app/api";
import { PrepaidServiceCategoriesDTO, PrepaidServiceFindDTO, PrepaidServiceResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { PREPAID_SERVICE_CATEGORIES } from "@app/modules";

export const usePrepaidServiceCategories = () => {
  return useQuery<AxiosResponse<PrepaidServiceCategoriesDTO>, AxiosError>(PREPAID_SERVICE_CATEGORIES, () =>
    ApiClient.PrepaidService.prepaidServiceControllerCategories(),
  );
}