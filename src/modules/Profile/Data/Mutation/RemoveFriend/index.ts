import { useMutation } from "react-query";
import { FriendsResponseDTO, RemoveFriendshipRequestPayload } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { FRIENDS_REMOVE } from "@app/modules";

export const useRemoveFriendMutation = () => {
  return useMutation<AxiosResponse<FriendsResponseDTO>, AxiosError, RemoveFriendshipRequestPayload>(
    FRIENDS_REMOVE,
    (payload) =>
      ApiClient.Friends.friendControllerRemoveFriendById(payload)
  );
};
