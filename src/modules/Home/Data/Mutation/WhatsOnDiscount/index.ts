import { useMutation } from "react-query";
import {
  WhatsDiscountCodePayloadDTO,
  WhatsDiscountCodeResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { STRIPE_PAYMENT } from "@app/modules";

export const useWhatsOnDiscountMutation = () => {
  return useMutation<
    AxiosResponse<WhatsDiscountCodeResponseDTO>,
    AxiosError,
    WhatsDiscountCodePayloadDTO
  >(
    STRIPE_PAYMENT,
    (payload) => {
      return ApiClient.WhatsOn.whatsOnControllerDiscountCodeApply(payload);
    }
  );
};
