import { useMutation, useQueryClient } from "react-query";
import { TODO_CREATE, TODO_LIST } from "../Constant";
import { ApiClient } from "@app/api";
import { CreateTodoPayload } from "@gooday_corp/gooday-api-client";

export const useTodoCreate = () => {
  const client = useQueryClient();
  return useMutation(
    TODO_CREATE,
    (payload: CreateTodoPayload) =>
      ApiClient.Todo.todoControllerCreateTodo(payload),
    {
      onSuccess: () => {
        client.invalidateQueries(TODO_LIST);
      },
    }
  );
};
