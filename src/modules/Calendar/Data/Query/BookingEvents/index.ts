import { useInfiniteQuery, useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import {
  CalendarEventResponseDTO,
  CalendarEventsDTO,
  CalendarEventsListPayload,
  CalendarSocialEventResponseDTO,
} from "@gooday_corp/gooday-api-client";
import {
  BOOKING_CALENDAR_EVENTS,
  BOOKING_EVENTS,
  BOOKING_EVENTS_LIST,
  SOCIAL_EVENTS,
} from "@app/modules";

type CalendarEvents = {
  startDate: string;
  endDate: string;
  calendar?: string;
  view: "daily" | "weekly" | "monthly";
};

export const useGetBookingEvents = (payload: CalendarEvents) => {
  return useQuery<AxiosResponse<CalendarEventsDTO>, AxiosError>(
    [...BOOKING_EVENTS, ...Object.values(payload)],
    () => ApiClient.Calendar.calendarControllerListEvents(payload),
    {
      enabled: !!payload.startDate && !!payload.endDate,
    }
  );
};

export const useGetCalendarBookingEvents = (payload: CalendarEvents) => {
  return useQuery<AxiosResponse<CalendarEventResponseDTO>, AxiosError>(
    [...BOOKING_CALENDAR_EVENTS, ...Object.values(payload)],
    () => ApiClient.Calendar.calendarControllerListCalendarsEvents(payload),
    {
      enabled: !!payload.startDate && !!payload.endDate,
    }
  );
};

export const useGetBookingListEvents = (payload: CalendarEventsListPayload) => {
  const findBookings = (pageParam: number) => {
    return ApiClient.Calendar.calendarControllerListEvents({
      ...payload,
      page: Number(pageParam + 1),
      pageSize: 10,
    });
  };
  return useInfiniteQuery<AxiosResponse<CalendarEventsDTO>, AxiosError>(
    [...BOOKING_EVENTS_LIST],
    ({ pageParam = 0 }) => findBookings(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (
          lastPage?.data?.data?.bookings?.length ||
          lastPage?.data?.data?.events?.length
        ) {
          return pages?.length;
        }
        return undefined;
      },
      onError(err) {},
    }
  );
};

export const useGetSocialEvents = (payload: CalendarEventsListPayload) => {
  return useQuery<AxiosResponse<CalendarSocialEventResponseDTO>, AxiosError>(
    [...SOCIAL_EVENTS, ...Object.values(payload)],
    () => ApiClient.Calendar.calendarControllerListSocialEvents(payload),
    {
      enabled: !!payload.startDate && !!payload.endDate,
    }
  );
};
