import { useMutation, useQueryClient } from "react-query";
import { TASK_ASSIGN, TASK_LIST } from "../Constant";
import { ApiClient } from "@app/api";
import { AssignTaskPayload } from "@gooday_corp/gooday-api-client";

export const useTaskAssignee = () => {
  const client = useQueryClient();
  return useMutation(
    TASK_ASSIGN,
    (payload: { id: string; data: AssignTaskPayload }) =>
      ApiClient.Todo.todoControllerAssignTask(payload.id, payload.data),
    {
      onSuccess: () => {
        client.invalidateQueries(TASK_LIST);
      },
    }
  );
};
