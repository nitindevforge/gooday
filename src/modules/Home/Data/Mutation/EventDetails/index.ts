import { useMutation } from "react-query";
import { EventResponseDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { EVENT_DETAILS } from "@app/modules";

export const useEventDetailsMutation = () => {
  return useMutation<
    AxiosResponse<EventResponseDTO>,
    AxiosError,
    { id: string }
  >(
    EVENT_DETAILS,
    (payload) => {
      return ApiClient.Event.eventControllerEventDetail(payload.id);
    }
  );
};
