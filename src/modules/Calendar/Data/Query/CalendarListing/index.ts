import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_LISTING } from "@app/modules";
import { CalendarListResponseDTO } from "@gooday_corp/gooday-api-client";

export const useGetMyCalendar = (active?: boolean) => {
  return useQuery<AxiosResponse<CalendarListResponseDTO>, AxiosError>(CALENDAR_LISTING, () =>
    ApiClient.Calendar.calendarControllerListMyCalendar(), {
    enabled: active ?? false
  }
  );
};
