import { useMutation, useQueryClient } from "react-query";
import { TASK_DELETE, TASK_LIST } from "../Constant";
import { ApiClient } from "@app/api";
import { CreateTaskPayload } from "@gooday_corp/gooday-api-client";

export const useTaskCreate = () => {
  const client = useQueryClient();
  return useMutation(
    [...TASK_DELETE],
    (payload: CreateTaskPayload) => ApiClient.Todo.todoControllerCreateTask(payload),
    {
      onSuccess: () => {
        client.invalidateQueries(TASK_LIST);
      },
    }
  );
};
