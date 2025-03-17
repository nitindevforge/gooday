import { useMutation } from "react-query";
import { CategoryListResponse } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_CATEGORIES } from "@app/modules";

export const useBusinessCategoriesMutation = () => {
  return useMutation<AxiosResponse<CategoryListResponse>, AxiosError, string>(
    BUSINESS_CATEGORIES,
    (payload) =>
      ApiClient.Business.businessTypeControllerListCategories(payload)
  );
};
