import { useMutation, useQueryClient } from "react-query";
import {
  CalendarDTO,
  RemoveCalendarPayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_LISTING, DELETE_CALENDAR } from "@app/modules";

export const useDeleteCalendarMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<CalendarDTO>,
    AxiosError,
    RemoveCalendarPayload
  >(
    DELETE_CALENDAR,
    (payload) => ApiClient.Calendar.calendarControllerRemoveCalendar(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CALENDAR_LISTING);
      },
    }
  );
};
