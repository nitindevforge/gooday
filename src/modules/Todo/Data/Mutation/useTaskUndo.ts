import { useMutation } from "react-query";
import { TASK_UNDO } from "../Constant";
import { ApiClient } from "@app/api";
import { UndoPayloadDTO } from "@gooday_corp/gooday-api-client";

export const useTaskUndo = () => {
  return useMutation([...TASK_UNDO], (payload: UndoPayloadDTO) =>
    ApiClient.Todo.todoControllerUndo(payload)
  );
};
