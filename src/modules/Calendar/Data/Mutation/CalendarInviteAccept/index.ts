import { useMutation, useQueryClient } from "react-query";
import {
  CalendarDTO,
  AcceptCollaborateInvitePayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_INVITE_ACCEPT, CALENDAR_LISTING } from "@app/modules";

export const useCalendarInviteAcceptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<CalendarDTO>,
    AxiosError,
    AcceptCollaborateInvitePayload
  >(CALENDAR_INVITE_ACCEPT, (payload) =>
    ApiClient.Calendar.calendarControllerAcceptCalendarInvite(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(CALENDAR_LISTING);
    }
  }
  );
};
