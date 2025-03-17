import { useMutation, useQueryClient } from "react-query";
import {
  EventDeletePayload,
  EventDeleteResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, UPDATE_EVENT } from "@app/modules";

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<EventDeleteResponseDTO>,
    AxiosError,
    EventDeletePayload
  >(
    UPDATE_EVENT,
    (payload) => ApiClient.Event.eventControllerDeleteEvents(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST]);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
      },
    }
  );
};
