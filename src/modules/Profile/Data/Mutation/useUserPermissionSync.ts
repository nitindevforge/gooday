import { useMutation, useQueryClient } from "react-query";
import { ApiClient } from "@app/api";
import { UserPermissionDTO } from "@gooday_corp/gooday-api-client";
import { USER_PERMISSION_SYNC } from "../Constants";
import { USER_ME } from "@app/modules";

export const useUserPermissionSyncMutation = () => {
  const client = useQueryClient();
  return useMutation(
    USER_PERMISSION_SYNC,
    (payload: UserPermissionDTO) =>
      ApiClient.Users.usersControllerSyncUserPermissions(payload),
    {
      onSuccess: () => {
        client.invalidateQueries(USER_ME);
      },
    }
  );
};
