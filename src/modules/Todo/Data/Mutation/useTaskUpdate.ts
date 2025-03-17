import { useMutation, useQuery, useQueryClient } from "react-query";
import { TASK_LIST, TASK_UPDATE } from "../Constant";
import { ApiClient } from "@app/api";
import { UpdateTaskPayload } from "@gooday_corp/gooday-api-client";

export const useTaskUpdate = () => {
  const client = useQueryClient();
  return useMutation(
    [...TASK_UPDATE],
    (payload: { id: string; data: UpdateTaskPayload }) =>
      ApiClient.Todo.todoControllerUpdateTask(payload.id, payload.data),
    // {
    //   onSuccess: () => {
    //     client.invalidateQueries(TASK_LIST);
    //   },
    // }
  );
};
