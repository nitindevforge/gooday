import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { WhatsOnFavoriteDTO, WhatsOnUnFavoriteResponse } from "@gooday_corp/gooday-api-client";
import { WHATS_ON_UNFAVORITE } from "../../Constants";

export const useUnfavoriteWhatsOnMutation = () => {
  return useMutation<AxiosResponse<WhatsOnUnFavoriteResponse>, AxiosError, WhatsOnFavoriteDTO>(
    WHATS_ON_UNFAVORITE,
    (payload) => ApiClient.WhatsOn.whatsOnControllerUnfavoriteWhatsOn(payload)
  );
};