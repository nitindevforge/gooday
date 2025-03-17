import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { WHATS_ON_FAVORITE_COUNT } from "@app/modules";
import {
  WhatsOnFavoriteCountResponseDTO,
} from "@gooday_corp/gooday-api-client";

export const useGetWhatsOnFavoriteCount = (id: string) => {
  return useQuery<AxiosResponse<WhatsOnFavoriteCountResponseDTO>, AxiosError>(
    [WHATS_ON_FAVORITE_COUNT],
    () => ApiClient.WhatsOn.whatsOnControllerFindFavoriteWhatOnCount(id),
    {
      enabled: !!id
    }
  );
};
