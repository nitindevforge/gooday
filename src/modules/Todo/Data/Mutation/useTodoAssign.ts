import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { TODO_ASSIGN, TODO_LIST } from "../Constant";
import { ApiClient } from "@app/api";
import { AddCollaboratorPayload } from "@gooday_corp/gooday-api-client";

export const useTodoAssign = () => {
  const client = useQueryClient();
  return useMutation(
    TODO_ASSIGN,
    (payload: { id: string; data: AddCollaboratorPayload }) =>
      ApiClient.Todo.todoControllerInviteCollaborator(payload.id, payload.data),
    {
      onSuccess: () => {
        client.invalidateQueries(TODO_LIST);
      },
    }
  );
};
