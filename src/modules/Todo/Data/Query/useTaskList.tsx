import { useQuery } from "react-query";
import { TASK_LIST } from "../Constant";
import { ApiClient } from "@app/api";
import { ListTaskListPayload } from "@gooday_corp/gooday-api-client";

export const useTaskList = (payload: ListTaskListPayload) => {
  return useQuery(
    [...TASK_LIST, payload.todo, payload?.start, payload?.end, payload?.status],
    () => ApiClient.Todo.todoControllerListTasks({
      ...payload
    })
  );
};
