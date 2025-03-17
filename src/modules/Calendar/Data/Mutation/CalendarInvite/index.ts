import { useMutation, useQueryClient } from "react-query";
import {
  CalendarDTO,
  SendCollaborateInvitePayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { BOOKING_CALENDAR_EVENTS, BOOKING_EVENTS, CALENDAR_INVITE, CALENDAR_LISTING } from "@app/modules";

export const useCalendarInviteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CalendarDTO>,
    AxiosError,
    SendCollaborateInvitePayload
  >(CALENDAR_INVITE, (payload) =>
    ApiClient.Calendar.calendarControllerSendCalendarInvite(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CALENDAR_LISTING);
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries([...BOOKING_CALENDAR_EVENTS]);
      }
    }
  );
};
