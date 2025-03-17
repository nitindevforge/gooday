import { useMutation, useQueryClient } from "react-query";
import { TODO_DELETE, TODO_LIST } from "../Constant";
import { ApiClient } from "@app/api";

export const useTodoDelete = () => {
  const client = useQueryClient();

  return useMutation(
    TODO_DELETE,
    (id: string) => ApiClient.Todo.todoControllerDeleteTodo(id),
    {
      onSuccess: () => {
        client.invalidateQueries(TODO_LIST);
      },
    }
  );
};
