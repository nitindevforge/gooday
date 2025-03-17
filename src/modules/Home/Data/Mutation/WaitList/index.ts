import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import {
  UserWaitingListPayloadDTO,
} from "@gooday_corp/gooday-api-client";
import { BUSINESS_VENUE_FAVORITE } from "../../Constants";

export const useWaitListMutation = () => {
  return useMutation(
    BUSINESS_VENUE_FAVORITE,
    (payload: UserWaitingListPayloadDTO) =>
      ApiClient.Users.usersControllerAddToWaitingList(payload)
  );
};
