import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { FeedbackPayloadDTO } from "@gooday_corp/gooday-api-client";
import { HELP_CENTER_RESPONSE } from "../Constants";

export const useFeedbackMutation = () => {
  return useMutation(
    HELP_CENTER_RESPONSE,
    (payload: FeedbackPayloadDTO) =>
      ApiClient.App.appResponseControllerFeedbackResponse(payload)
  );
};
