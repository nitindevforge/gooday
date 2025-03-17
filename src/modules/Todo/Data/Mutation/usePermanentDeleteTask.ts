import { useMutation, useQueryClient } from "react-query";
import {
  MY_FRIENDS_TASK_LIST,
  MY_TASK_LIST,
  PERMANENT_TASK_DELETE,
  TASK_LIST,
} from "../Constant";
import { ApiClient } from "@app/api";

export const usePermanentTaskDelete = () => {
  const client = useQueryClient();
  return useMutation(
    PERMANENT_TASK_DELETE,
    (id: string) => ApiClient.Todo.todoControllerPermanentDeleteTask(id),
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
