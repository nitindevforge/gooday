import { useMutation, useQueryClient } from "react-query";
import { TODO_LIST, TODO_RENAME } from "../Constant";
import { ApiClient } from "@app/api";
import { UpdateTodoPayload } from "@gooday_corp/gooday-api-client";

export const useUpdateTodo = () => {
  const client = useQueryClient();
  return useMutation(
    [TODO_RENAME],
    (payload: { id: string; data: UpdateTodoPayload }) =>
      ApiClient.Todo.todoControllerUpdateTodo(payload.id, payload.data),
    {
      onSuccess: () => {
        client.invalidateQueries(TODO_LIST);
      },
    }
  );
};
