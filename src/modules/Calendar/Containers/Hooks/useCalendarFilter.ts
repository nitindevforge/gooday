import { CalendarEvents } from "@gooday_corp/gooday-api-client";
import { AllEvent, EventTypes } from "./useGetMappedEvents";
import { useGetUser } from "@app/modules";

const businessStatus = ["RESCHEDULED", "CONFIRMED", "UNCONFIRMED"];

export const useCalendarFilter = () => {
  const { data: user } = useGetUser();
  const loggedInUserId = user?.data.data?._id ?? "";
  const isBusinessUser = user?.data.data?.role === "business";
  let filteredEvents: AllEvent[] = [];

  const filterEvent = (event: AllEvent) => {
    if (isBusinessUser) {
      return {
        ...event,
        eventType: (event?.status?.toLocaleLowerCase() || event?.eventType) as EventTypes,
      }
    }
    const eventOwner: string = event.createdBy!;
    const collaboratorsLength: number = event?.collaborators?.length;
    const isBooking = event.type === "booking";
    const customersExceptMe = event?.collaborators?.filter(
      (el) => el._id !== loggedInUserId
    );
    const myStatus = event?.collaborators?.find(
      (el) => el._id === loggedInUserId
    )?.status;

    if (
      collaboratorsLength &&
      eventOwner !== loggedInUserId &&
      myStatus === "UNCONFIRMED"
    ) {
      return {
        ...event,
        eventType: "unconfirmed",
      };
    }

    if (
      isBooking &&
      eventOwner === loggedInUserId &&
      collaboratorsLength === 1
    ) {
      return {
        ...event,
        eventType: "bookings",
      };
    }

    if (event?.type === "event" && !customersExceptMe.length) {
      return {
        ...event,
        eventType: "invites",
      };
    }

    if (
      (isBooking &&
        collaboratorsLength > 0 &&
        event.collaborators.some((cust) => cust.status === "UNCONFIRMED") &&
        eventOwner === loggedInUserId) ||
      (collaboratorsLength && customersExceptMe.length) ||
      !(myStatus !== "CONFIRMED" && eventOwner !== loggedInUserId) ||
      !(
        eventOwner === loggedInUserId &&
        collaboratorsLength === 1 &&
        isBooking
      ) ||
      !(
        customersExceptMe.some((cust) => cust.status !== "CONFIRMED") &&
        eventOwner === loggedInUserId
      )
    ) {
      return {
        ...event,
        eventType: "shared",
      };
    }
    return event;
  }

  const filterEvents = (eventTypes: EventTypes[], data: CalendarEvents) => {
    const { bookings = [], events = [] } = data ?? {};

    const allEvents: AllEvent[] = [
      ...bookings.map((el) => ({
        ...el,
        type: "booking",
      })),
      ...events.map((el) => ({
        ...el,
        type: "event",
      })),
    ];

    if (isBusinessUser) {
      filteredEvents =
        bookings
          .filter((el) => businessStatus.includes(el.status))
          .map((event) => ({
            ...event,
            eventType: event.status.toLocaleLowerCase() as EventTypes,
            type: "booking",
          })) || [];
    } else {
      filteredEvents = allEvents.map((event) => filterEvent(event)) || [];
    }

    return (
      filteredEvents
        ?.filter((evnt) => {
          if (!eventTypes.length) return true;

          return eventTypes.includes(evnt.eventType as any);
        })
        ?.sort((a, b) => new Date(a?.startDate) - new Date(b?.startDate)) || []
    );
  };
  return { filterEvents, filterEvent };
};
