import { CalendarListResponse } from "@gooday_corp/gooday-api-client";
import { create } from "zustand";

export type UserCalendarStore = {
  calendar: CalendarListResponse & {
    _id: string;
  };
  modalVisible: boolean;
  focus: boolean;
  calenderType: "week" | "month";
  updateCalendar: (data: Partial<CalendarListResponse>) => void;
  onModalVisible: (data: boolean) => void;
  onFocus: (data: boolean) => void;
  setCalenderType: (data: "week" | "month") => void;
};

const useStore = create<UserCalendarStore>()((set) => ({
  calendar: {
    collaborators: [],
    type: null,
    name: "",
    owner: null,
    _id: "",
  },
  modalVisible: false,
  calenderType: "month",
  setCalenderType: (value) => {
    set((state) => ({
      ...state,
      calenderType: value,
    }));
  },
  onModalVisible: (value: boolean) => {
    set((state) => ({
      ...state,
      modalVisible: value,
    }));
  },
  onFocus: (value: boolean) => {
    set((state) => ({
      ...state,
      focus: value,
    }));
  },
  updateCalendar: (data) =>
    set((state) => ({
      ...state,
      calendar: JSON.parse(JSON.stringify({ ...state.calendar, ...data })),
    })),
}));

export const useCalendar = () => {
  const {
    calendar,
    updateCalendar,
    modalVisible,
    onModalVisible,
    calenderType,
    setCalenderType,
    focus,
    onFocus,
  } = useStore();

  return {
    calendar,
    updateCalendar,
    modalVisible,
    onModalVisible,
    calenderType,
    setCalenderType,
    focus,
    onFocus,
  };
};
