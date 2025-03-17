import { useMutation } from "react-query";
import { FriendsResponseDTO, DeclineFriendshipRequestPayload } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { FRIENDS_REQUEST_DECLINE } from "@app/modules";

export const useDeclineFriendRequestMutation = () => {

  return useMutation<AxiosResponse<FriendsResponseDTO>, AxiosError, DeclineFriendshipRequestPayload>(
    FRIENDS_REQUEST_DECLINE,
    (payload) =>
      ApiClient.Friends.friendControllerDeclineFriendRequest(payload)
  );
};
