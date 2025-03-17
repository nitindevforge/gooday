import { useMutation, useQueryClient } from "react-query";
import {
  AcceptEventInvitePayload,
  EventDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { ACCEPT_EVENT, BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, CALENDAR_LISTING } from "@app/modules";

export const useAcceptEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<EventDTO>,
    AxiosError,
    AcceptEventInvitePayload
  >(
    ACCEPT_EVENT,
    (payload) => ApiClient.Event.eventControllerAcceptEventInvite(payload),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST]);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
        queryClient.invalidateQueries(CALENDAR_LISTING);
      },
    }
  );
};
