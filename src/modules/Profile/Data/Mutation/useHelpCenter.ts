import { useMutation } from "react-query";
import { ApiClient } from "@app/api";
import { HelpCenterPayloadDTO } from "@gooday_corp/gooday-api-client";
import { HELP_CENTER_RESPONSE } from "../Constants";

export const useHelpCenterMutation = () => {
  return useMutation(
    HELP_CENTER_RESPONSE,
    (payload: HelpCenterPayloadDTO) =>
      ApiClient.App.appResponseControllerHelpCenterResponse(payload)
  );
};
