import { useMutation } from "react-query";
import {
  CreateEventPayloadDTO,
  EventResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, BOOKING_EVENTS_LIST, CALENDAR_LISTING, CALENDAR_SLOTS, CREATE_EVENT } from "@app/modules";
import { queryClient } from "../../../../../index";

export const useCreateEventMutation = () => {
  return useMutation<
    AxiosResponse<EventResponseDTO>,
    AxiosError,
    CreateEventPayloadDTO
  >(
    CREATE_EVENT,
    (payload) => {
      return ApiClient.Event.eventControllerCreateEvents(payload);
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_EVENTS_LIST]);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
        queryClient.invalidateQueries(CALENDAR_LISTING);
        queryClient.invalidateQueries(CALENDAR_SLOTS);
      },
    }
  );
};
