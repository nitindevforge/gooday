import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { GOAL_LIST } from "@app/modules";
import { GoalListResponse } from "@gooday_corp/gooday-api-client";

export const useGetGoals = () => {
  return useQuery<AxiosResponse<GoalListResponse>, AxiosError>(GOAL_LIST, () =>
    ApiClient.Goals.goalControllerListGoals(),
  );
};
  