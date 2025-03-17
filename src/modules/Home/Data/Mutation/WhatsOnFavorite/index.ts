import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { WhatsOnFavoriteDTO, WhatsOnFavoriteResponse } from "@gooday_corp/gooday-api-client";
import { WHATS_ON_FAVORITE } from "../../Constants";

export const useMarkFavoriteWhatsOnMutation = () => {
  return useMutation<AxiosResponse<WhatsOnFavoriteResponse>, AxiosError, WhatsOnFavoriteDTO>(
    WHATS_ON_FAVORITE,
    (payload) => ApiClient.WhatsOn.whatsOnControllerMarkFavoriteWhatsOn(payload)
  );
};