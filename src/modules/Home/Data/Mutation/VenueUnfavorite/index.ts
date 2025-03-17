import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import {
  BusinessFavoriteDTO,
  BusinessUnFavoriteResponse,
} from "@gooday_corp/gooday-api-client";
import { BUSINESS_VENUE_FAVORITE } from "../../Constants";

export const useVenueUnfavoriteMutation = () => {
  return useMutation<
    AxiosResponse<BusinessUnFavoriteResponse>,
    AxiosError,
    BusinessFavoriteDTO
  >(BUSINESS_VENUE_FAVORITE, (payload) =>
    ApiClient.Business.businessTypeControllerUnFavoriteBusiness(payload)
  );
};
