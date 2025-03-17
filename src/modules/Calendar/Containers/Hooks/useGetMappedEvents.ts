import { BookingResponse, EventResponse } from "@gooday_corp/gooday-api-client";
import { useMemo, useState } from "react";
import { useCalendarFilter, useGetCalendarBookingEvents, useGetSocialEvents } from "@app/modules";
import moment, { MomentInput } from "moment";
import { useCalendar } from "@app/common";

export type EventTypes =
  | "bookings"
  | "shared"
  | "invites"
  | "unconfirmed"
  | "rescheduled"
  | "confirmed";

export type AllEvent = (BookingResponse | EventResponse) & {
  type: "booking" | "event";
  eventType?: EventTypes;
};

export const useGetEvents = (
  date: MomentInput,
  calenderType: "week" | "month"
) => {
  const { calendar } = useCalendar();
  const { filterEvents } = useCalendarFilter()

  const { data, isLoading, isRefetching } = useGetCalendarBookingEvents({
    startDate:
      calenderType === "week"
        ? new Date(moment(date).startOf("day").toString()).toISOString()
        : moment(date).startOf("month").toISOString(),
    endDate:
      calenderType === "week"
        ? new Date(moment(date).endOf("day").toString()).toISOString()
        : moment(date).endOf("month").toISOString(),
    calendar: calendar?._id ?? "",
    view: calenderType === "week" ? "weekly" : "monthly",
  });


  const {data: socialEvent} = useGetSocialEvents({
    startDate:
      calenderType === "week"
        ? new Date(moment(date).startOf("day").toString()).toISOString()
        : moment(date).startOf("month").toISOString(),
    endDate:
      calenderType === "week"
        ? new Date(moment(date).endOf("day").toString()).toISOString()
        : moment(date).endOf("month").toISOString(),
    calendar: calendar?._id ?? "",
    view: calenderType === "week" ? "weekly" : "monthly",
  })

  const [eventTypes, setEventTypesInternal] = useState<EventTypes[]>([]);

  const setEventType = (eventType: EventTypes) => {
    if (eventTypes.includes(eventType)) {
      setEventTypesInternal([...eventTypes].filter((el) => el !== eventType));
      return;
    }
    setEventTypesInternal([...new Set([...eventTypes, eventType])]);
  };

  const calendarEvents = useMemo(() => {
    const eventData = filterEvents(eventTypes, data?.data.data!) || []
    const socialEventData = socialEvent?.data.data || []
    return [...eventData,...socialEventData]
  }, [eventTypes, data?.data.data,socialEvent?.data.data]);

  return {
    calendarEvents,
    eventTypes,
    setEventType,
    isLoading: isRefetching || isLoading,
  };
};
