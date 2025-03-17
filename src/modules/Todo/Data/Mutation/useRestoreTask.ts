import { useMutation, useQueryClient } from "react-query";
import {
  MY_FRIENDS_TASK_LIST,
  MY_TASK_LIST,
  RESTORE_TASK,
  TASK_LIST,
} from "../Constant";
import { ApiClient } from "@app/api";

export const useRestoreTask = () => {
  const client = useQueryClient();
  return useMutation(
    RESTORE_TASK,
    (id: string) => ApiClient.Todo.todoControllerRestoreTask(id),
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
