import { useMutation, useQueryClient } from "react-query";
import {
  MY_FRIENDS_TASK_LIST,
  MY_TASK_LIST,
  TASK_DELETE,
  TASK_LIST,
} from "../Constant";
import { ApiClient } from "@app/api";

export const useTaskDelete = () => {
  const client = useQueryClient();
  return useMutation(
    [...TASK_DELETE],
    (id: string) => ApiClient.Todo.todoControllerRemoveTask(id),
    {
      onSuccess: () => {
        client.invalidateQueries(TASK_LIST);
        client.invalidateQueries(MY_TASK_LIST);
        client.invalidateQueries(MY_FRIENDS_TASK_LIST);
      },
      onError(error) {
        console.log(error, "error");
      },
    }
  );
};
