import { useMutation, useQueryClient } from "react-query";
import {
  CalendarDTO,
  RejectCollaborateInvitePayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_INVITE_REJECT, CALENDAR_LISTING } from "@app/modules";

export const useCalendarInviteRejectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CalendarDTO>,
    AxiosError,
    RejectCollaborateInvitePayload
  >(CALENDAR_INVITE_REJECT, (payload) =>
    ApiClient.Calendar.calendarControllerRejectCalendarInvite(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CALENDAR_LISTING);
      }
    }
  );
};
