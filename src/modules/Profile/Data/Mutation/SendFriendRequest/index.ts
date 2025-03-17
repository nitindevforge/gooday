import { useMutation } from "react-query";
import { FriendsResponseDTO, SendFriendshipRequestPayload } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { FRIENDS_REQUEST_ACCEPT } from "@app/modules";

export const useSendFriendRequestMutation = () => {
  return useMutation<AxiosResponse<FriendsResponseDTO>, AxiosError, SendFriendshipRequestPayload>(
    FRIENDS_REQUEST_ACCEPT,
    (payload) =>
      ApiClient.Friends.friendControllerSendFriendRequest(payload)
  );
};
