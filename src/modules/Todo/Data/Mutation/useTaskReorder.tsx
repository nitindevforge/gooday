import { useMutation, useQueryClient } from "react-query";
import { TASK_LIST, TASK_REORDER } from "../Constant";
import { ApiClient } from "@app/api";
import { TaskListReorderPayloadDTO } from "@gooday_corp/gooday-api-client";

export const useTaskReorder = () => {
  const client = useQueryClient();
  return useMutation(
    TASK_REORDER,
    (payload: TaskListReorderPayloadDTO) =>
      ApiClient.Todo.todoControllerReorderTask(payload),
    {
      onSuccess: () => {
        client.invalidateQueries(TASK_LIST);
      },
    }
  );
};
