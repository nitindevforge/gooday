import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_VENUE_FAVORITE_ID } from "@app/modules";
import {
  BusinessFavoriteResponseDTO,
} from "@gooday_corp/gooday-api-client";

export const useGetBusinessVenueFavorite = (id?: string) => {
  return useQuery<AxiosResponse<BusinessFavoriteResponseDTO>, AxiosError>(
    [BUSINESS_VENUE_FAVORITE_ID, id],
    () => ApiClient.Business.businessTypeControllerFindFavoriteBusinessVenue(id!),
  );
};
