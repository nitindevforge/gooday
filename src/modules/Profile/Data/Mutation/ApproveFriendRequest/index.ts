import { useMutation } from "react-query";
import { FriendsResponseDTO, ApproveFriendshipRequestPayload } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { FRIENDS_REQUEST_ACCEPT } from "@app/modules";

export const useApproveFriendRequestMutation = () => {

  return useMutation<AxiosResponse<FriendsResponseDTO>, AxiosError, ApproveFriendshipRequestPayload>(
    FRIENDS_REQUEST_ACCEPT,
    (payload) =>
      ApiClient.Friends.friendControllerApproveFriendRequest(payload)
  );
};
