import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BusinessFavoriteDTO, BusinessFavoriteResponse } from "@gooday_corp/gooday-api-client";
import { BUSINESS_VENUE_FAVORITE } from "../../Constants";

export const useVenueFavoriteMutation = () => {
  return useMutation<AxiosResponse<BusinessFavoriteResponse>, AxiosError, BusinessFavoriteDTO>(
    BUSINESS_VENUE_FAVORITE,
    (payload) => ApiClient.Business.businessTypeControllerMarkBusinessAsFavorite(payload)
  );
};