import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BUSINESS_VENUE_COUNT } from "@app/modules";
import {
  BusinessFavoriteCountResponseDTO,
} from "@gooday_corp/gooday-api-client";

export const useGetBusinessVenueFriendCount = (id?: string) => {
  return useQuery<AxiosResponse<BusinessFavoriteCountResponseDTO>, AxiosError>(
    [BUSINESS_VENUE_COUNT, id],
    () => ApiClient.Business.businessTypeControllerFindFavoriteBusinessVenueCount(id!),
  );
};
