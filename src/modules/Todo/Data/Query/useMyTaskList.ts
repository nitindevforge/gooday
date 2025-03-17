import { useQuery } from "react-query";
import { MY_TASK_LIST } from "../Constant";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { TaskListResponseDTO } from "@gooday_corp/gooday-api-client";

export const useMyTaskList = () => {
  return useQuery<AxiosResponse<TaskListResponseDTO>, AxiosError>(MY_TASK_LIST, () =>
    ApiClient.Todo.todoControllerListDelegatedMyTasks(),
  );
};
