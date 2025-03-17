import { useMutation } from "react-query";
import {
  CalendarResponseDTO,
  CreateCalendarPayload,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_ADD } from "@app/modules";

export const useAddCalendarMutation = () => {
  return useMutation<
    AxiosResponse<CalendarResponseDTO>,
    AxiosError,
    CreateCalendarPayload
  >(CALENDAR_ADD, (payload) =>
    ApiClient.Calendar.calendarControllerCreateSharedCalendar(payload)
  );
};
