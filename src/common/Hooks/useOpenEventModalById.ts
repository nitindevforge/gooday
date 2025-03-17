import {
  BookingDetailsModal,
  useBookingDetailsMutation,
  useCalendarFilter,
  useEventDetailsMutation,
} from "@app/modules";
import NiceModal from "@ebay/nice-modal-react";
import { CalendarEvents } from "@gooday_corp/gooday-api-client";

export const useOpenEventModalById = () => {
  const { mutate: event, isLoading } = useEventDetailsMutation();
  const { mutate: booking, isLoading: isBookingLoading } =
    useBookingDetailsMutation();
  const { filterEvent } = useCalendarFilter();
  const openEventModalById = async (
    id: string,
    type: "event" | "booking" | 'google' | 'microsoft',
    eventData?: CalendarEvents | null
  ) => {
    const eventType = {
      google: 'unconfirmed',
      microsoft: 'invites'
    }
    if (eventData) {
      NiceModal.show(BookingDetailsModal, {
        data: {
          ...eventData,
          eventType: eventType[type!],
          type,
        },
      });
      return
    }
    const mutate = type === "event" ? event : booking;
    mutate(
      { id: id },
      {
        onSuccess: (response) => {
          NiceModal.show(BookingDetailsModal, {
            data: filterEvent({
              ...response?.data?.data,
              eventType: "unconfirmed",
              type,
            }),
          });
        },
      }
    );
  };
  return { openEventModalById, isLoading: isLoading || isBookingLoading };
};
