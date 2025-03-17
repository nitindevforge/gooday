import { useQuery } from "react-query";
import { MY_FRIENDS_TASK_LIST } from "../Constant";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { TaskListResponseDTO } from "@gooday_corp/gooday-api-client";

export const useMyFriendsTaskList = () => {
  return useQuery<AxiosResponse<TaskListResponseDTO>, AxiosError>(MY_FRIENDS_TASK_LIST, () =>
    ApiClient.Todo.todoControllerListDelegatedMyFriendsTasks(),
  );
};
