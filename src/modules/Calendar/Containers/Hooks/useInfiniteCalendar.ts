import { create } from "zustand";
import {
  EventTypes,
  useCalendarFilter,
  useGetCalendarBookingEvents,
  useGetSocialEvents,
} from "@app/modules";
import { useCalendar } from "@app/common";
import {
  MAX_MONTHS,
  TOTAL_MONTH_BUFFER,
} from "../../Components/InfiniteCalendar/constants";
import { useEffect, useMemo, useState } from "react";
import { MomentInput } from "moment";

export type InfiniteCalendarStore = {
  events: Array<any>;
  setEvents: (events: Array<any>) => void;
  reset: () => void;
};

export const useInfiniteCalendarStore = create<InfiniteCalendarStore>()(
  (set) => ({
    events: [],
    setEvents: (events) => set({ events }),
    reset: () => set({ events: [] }),
  })
);

export const useInfiniteCalendar = ({
  eventTypes,
  initialDate,
}: {
  eventTypes: EventTypes[];
  initialDate: MomentInput;
}) => {
  const allMonths = useMemo(() => {
    return Array.from({ length: MAX_MONTHS * 2 }, (_, index) => {
      const date = new Date(initialDate as string);
      date.setMonth(date.getMonth() + MAX_MONTHS - index);
      date.setDate(1);

      return date.toISOString().split("T")[0];
    }).reverse();
  }, []);

  const { calendar } = useCalendar();
  const { filterEvents } = useCalendarFilter();
  const { setEvents, reset } = useInfiniteCalendarStore();

  const currentMonthIndex = MAX_MONTHS - 1;

  const [currentRange, setCurrentRange] = useState([
    currentMonthIndex - TOTAL_MONTH_BUFFER,
    currentMonthIndex + TOTAL_MONTH_BUFFER,
  ]);

  const [currentRangeStartIndex, currentRangeEndIndex] = currentRange;

  const currentRangeStartDay = allMonths[currentRangeStartIndex];
  const currentRangeEndDay = allMonths[currentRangeEndIndex];

  const { data } = useGetCalendarBookingEvents({
    startDate: new Date(currentRangeStartDay).toISOString(),
    endDate: new Date(currentRangeEndDay).toISOString(),
    calendar: calendar?._id ?? "",
    view: "monthly",
  });

  const {data: socialEvent} = useGetSocialEvents({
    startDate: new Date(currentRangeStartDay).toISOString(),
    endDate: new Date(currentRangeEndDay).toISOString(),
    calendar: calendar?._id ?? "",
    view: "monthly",
  })
  
  const calendarEvents = useMemo(() => {
    return filterEvents(eventTypes, data?.data.data!) || [];
  }, [eventTypes, data?.data.data]);

  useEffect(() => {
    const socialEventData = socialEvent?.data.data! || []
    setEvents([...calendarEvents,...socialEventData]);
  }, [calendarEvents,socialEvent?.data.data]);

  return {
    allMonths,
    currentMonthIndex,
    currentRange,
    setCurrentRange,
    resetCalendar: reset,
  };
};
