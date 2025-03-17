import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { WHATS_ON_FAVORITE__Id } from "@app/modules";
import {
  WhatsOnFavoriteResponseDTO,
} from "@gooday_corp/gooday-api-client";

export const useGetWhatsOnFavorite = (id: string) => {
  return useQuery<AxiosResponse<WhatsOnFavoriteResponseDTO>, AxiosError>(
    [WHATS_ON_FAVORITE__Id],
    () => ApiClient.WhatsOn.whatsOnControllerFindWhatsOnById(id),
    {
      enabled: !!id
    }
  );
};
