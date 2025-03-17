import { useMutation } from "react-query";
import {
  PrepaidServiceDiscountCodePayloadDTO,
  PrepaidServiceDiscountCodeResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { PREPAID_SERVICE_DISCOUNT } from "@app/modules";

export const usePrepaidServiceDiscountMutation = () => {
  return useMutation<
    AxiosResponse<PrepaidServiceDiscountCodeResponseDTO>,
    AxiosError,
    PrepaidServiceDiscountCodePayloadDTO
  >(
    PREPAID_SERVICE_DISCOUNT,
    (payload) => {
      return ApiClient.PrepaidService.prepaidServiceControllerDiscountCodeApply(payload);
    }
  );
};
