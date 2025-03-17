import { useMutation, useQueryClient } from "react-query";
import {
  CalendarDTO,
  RenameCalendarPayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_INVITE_RENAME, CALENDAR_LISTING } from "@app/modules";

export const useCalendarRenameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<CalendarDTO>,
    AxiosError,
    RenameCalendarPayload
    >(CALENDAR_INVITE_RENAME, (payload) =>
    ApiClient.Calendar.calendarControllerRenameCalendar(payload), {
      onSuccess: () => {
        queryClient.invalidateQueries(CALENDAR_LISTING);
      }
    }
  );
};
