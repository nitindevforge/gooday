import { CalendarEventsDTO } from "@gooday_corp/gooday-api-client";
import { useMemo, useState } from "react";
import { EventTypes, useCalendarFilter, useGetBookingListEvents } from "@app/modules";
import moment, { MomentInput } from "moment";
import { useCalendar } from "@app/common";
import { AxiosResponse } from "axios";

export const useGetListEvents = (
  date: MomentInput,
  calenderType: "week" | "month"
) => {
  const { calendar } = useCalendar();
  const { filterEvents } = useCalendarFilter();

  const { data, isLoading, isRefetching, isFetching, fetchNextPage } = useGetBookingListEvents({
    startDate: moment().toISOString(),
    endDate:
      calenderType === "week"
        ? new Date(moment(date).endOf("day").toString()).toISOString()
        : moment(date).endOf("month").toISOString(),
    calendar: calendar?._id ?? "",
    view: calenderType === "week" ? "weekly" : "monthly",
  });

  const [eventTypes, setEventTypesInternal] = useState<EventTypes[]>([]);

  const setEventType = (eventType: EventTypes) => {
    setEventTypesInternal((prev) =>
      prev.includes(eventType) ? prev.filter((el) => el !== eventType) : [...new Set([...prev, eventType])]
    );
  };

  const calendarEvents = useMemo(() => {
    const bookings = data?.pages?.reduce(
      (acc: CalendarEventsDTO["data"]["bookings"], page: AxiosResponse<CalendarEventsDTO>) => {
        return [...(acc ?? []), ...(page?.data?.data?.bookings ?? [])];
      },
      []
    )?.map((el) => ({
      ...el,
      type: "booking",
    }));

    const events = data?.pages?.reduce(
      (acc: CalendarEventsDTO["data"]["events"], page: AxiosResponse<CalendarEventsDTO>) => {
        return [...(acc ?? []), ...(page?.data?.data?.events ?? [])];
      },
      []
    )?.map((el) => ({
      ...el,
      type: "event",
    }));

    let updatedAllEvents = filterEvents(eventTypes, {
      bookings: bookings!,
      events: events!
    });

    return updatedAllEvents;
  }, [data, eventTypes]);

  return {
    calendarEvents,
    eventTypes,
    setEventType,
    isLoading: isRefetching || isLoading,
    fetchNextPage,
    isFetching,
  };
};
