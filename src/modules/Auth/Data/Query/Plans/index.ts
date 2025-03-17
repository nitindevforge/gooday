import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { PLAN_LIST } from "@app/modules";
import { PlanResponseDTO } from "@gooday_corp/gooday-api-client";

export const useGetPlans = () => {
  return useQuery<AxiosResponse<PlanResponseDTO>, AxiosError>(PLAN_LIST, () =>
    ApiClient.Plans.paymentControllerGetPlans(),
  );
};
  