import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { PlanUpsertPayloadDTO, StripePlanUpsertResponseDTO } from "@gooday_corp/gooday-api-client";
import { PAYMENT } from "@app/modules";

export const usePlanUpsertMutation = () => {
  return useMutation<AxiosResponse<StripePlanUpsertResponseDTO>, AxiosError, PlanUpsertPayloadDTO>(
    PAYMENT,
    payload => ApiClient.Payment.paymentControllerPlanUpsert(payload),
  );
};