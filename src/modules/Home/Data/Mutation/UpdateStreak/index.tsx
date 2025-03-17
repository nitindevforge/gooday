import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { UPDATE_STREAK } from "../..";
import { ApiClient } from "@app/api";
import { USER_ME } from "@app/modules";

export const useUpdateStreak = () => {
  const client = useQueryClient();
  return useMutation(
    UPDATE_STREAK,
    () => ApiClient.Users.usersControllerStreak(),
    {
      onSuccess: () => {
        client.invalidateQueries(USER_ME);
      },
    }
  );
};
