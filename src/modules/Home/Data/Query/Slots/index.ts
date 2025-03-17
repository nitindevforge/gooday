import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_SLOTS } from "@app/modules";
import {
  StandardBookingSlotsPayload,
  CalendarSlotsDTO,
} from "@gooday_corp/gooday-api-client";

export const useGetAvailableSlots = ({
  collaborators,
  endDate,
  staffs,
  startDate,
  id,
  enabled = true,
}: StandardBookingSlotsPayload & { enabled?: boolean }) => {
  return useQuery<AxiosResponse<CalendarSlotsDTO>, AxiosError>(
    [
      CALENDAR_SLOTS,
      id,
      collaborators,
      startDate,
      endDate,
    ],
    () => ApiClient.Calendar.calendarControllerListStandardBookingSlots({
      collaborators,
      endDate,
      staffs,
      startDate,
      id: id
    }),
    {
      enabled,
    }
  );
};
