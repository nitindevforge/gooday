import { BookingState } from "@app/common";
import { useGetAvailableSlots, useGetPrepaidBookingSlots, useGetWhatsOnAvailableSlots } from "../Data";
import moment from "moment";
import { AxiosResponse } from "axios";
import { WhatsOnAvailabilityResponseDTO } from "@gooday_corp/gooday-api-client";

interface BookingAvailabilityProps {
  booking: BookingState;
  startDate: string;
  endDate: string;
}

enum BookingType {
  WhatsOn = 'WhatsOn',
  PrePaid = 'PrePaid',
  Standard = 'Standard',
}

const getBookingType = (booking: BookingState) => {
  if (booking.whatsOn) {
    return BookingType.WhatsOn;
  }

  if (booking.serviceId) {
    return BookingType.PrePaid;
  }

  return BookingType.Standard;
}

export const useBookingAvailability = ({
  booking,
  startDate,
  endDate,
}: BookingAvailabilityProps) => {
  const collaborators = booking?.collaborators?.filter((element) => element?._id !== null)?.map((el) => el?._id ?? '') || [];
  const bookingType = getBookingType(booking);
  const staffs = booking.staffs || [];

  const { data: standardBookingResponse, isLoading } = useGetAvailableSlots({
    id: booking?.venue?._id ? booking?.venue?._id : booking?.venue,
    collaborators,
    startDate,
    endDate,
    staffs,
    enabled: bookingType === BookingType.Standard,
  });

  const { data: whatsOnBookingResponse, isLoading: isWhatsOnLoading, error: whats } = useGetWhatsOnAvailableSlots({
    collaborators,
    id: booking.whatsOn ?? '',
    startDate,
    endDate,
    enabled: bookingType === BookingType.WhatsOn,
    staffs: []
  });

  const { data: prepaidBookingResponse, isLoading: isPrepaidLoading, error } = useGetPrepaidBookingSlots({
    collaborators,
    id: booking?.serviceId ?? '',
    startDate,
    endDate,
    enabled: bookingType === BookingType.PrePaid,
    staffs: booking?.selectedStaff ? [booking?.selectedStaff!] : []
  });

  return {
    data: (
      bookingType === BookingType.WhatsOn
        ? whatsOnBookingResponse
        : bookingType === BookingType.PrePaid
          ? prepaidBookingResponse
          : standardBookingResponse
    ),
    isLoading: (
      bookingType === BookingType.WhatsOn
        ? isWhatsOnLoading
        : bookingType === BookingType.PrePaid
          ? isPrepaidLoading
          : isLoading
    ),
  }
}