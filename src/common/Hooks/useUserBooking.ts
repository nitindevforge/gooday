import {
  BusinessVenueDetailsEntity,
  CreateBookingPayload,
} from "@gooday_corp/gooday-api-client";
import { create } from "zustand";

export type BookingState = {
  venueObj: BusinessVenueDetailsEntity;
  prepaid?: boolean
  progress?: number
  startDate?: Date | null
  endDate?: Date | null
  isRecurring: boolean
} & CreateBookingPayload

export type UserBookingStore = {
  booking: BookingState;
  updateBooking: (data: Partial<UserBookingStore["booking"]>) => void;
  resetBooking: () => void;
};

export const bookingInitialValues = {
  business: "",
  calendar: null,
  collaborators: [],
  method: "APP",
  note: "",
  occasion: null,
  paymentMethodId: null,
  title: "",
  venue: "",
  venueObj: {},
  prepaid: false,
  progress: 0,
  quantity: 1,
  serviceId: null,
  selectedStaff: null,
  whatsOn: null,
  from: '',
  to: '',
  date: '',
  startDate: null,
  endDate: null,
  paymentMethod: null,
  isRecurring: false
};

const useStore = create<UserBookingStore>()((set) => ({
  booking: bookingInitialValues,
  updateBooking: (data) =>
    set((state) => ({
      ...state,
      booking: JSON.parse(JSON.stringify({ ...state.booking, ...data })),
    })),
  resetBooking: () =>
    set((state) => ({ ...state, booking: bookingInitialValues })),
}));

export const useUserBooking = () => {
  const { booking, updateBooking, resetBooking } = useStore();
  return { booking, updateBooking, resetBooking };
};
