import { useMutation, useQueryClient } from "react-query";
import {
  CreateEventPayloadDTO,
  EventResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, UPDATE_EVENT } from "@app/modules";

export const useEditEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<EventResponseDTO>,
    AxiosError,
    CreateEventPayloadDTO
  >(
    UPDATE_EVENT,
    (payload) => ApiClient.Event.eventControllerUpdateEvents(payload),
    {
      onSuccess: () => {
        queryClient.refetchQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST]);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
      },
    }
  );
};
