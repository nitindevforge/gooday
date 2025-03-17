import { ApiClient } from "@app/api";
import {
  CalendarSlotsDTO,
  WhatsOnSlotsPayload,
} from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { PREPAID_SLOTS } from "../../Constants";

export const useGetPrepaidBookingSlots = (payload: WhatsOnSlotsPayload & { enabled: boolean }) => {
  return useQuery<AxiosResponse<CalendarSlotsDTO>, AxiosError>(
    [
      PREPAID_SLOTS,
      payload.collaborators,
      payload.startDate,
      payload.endDate,
      payload.id,
    ],
    () => ApiClient.Calendar.calendarControllerListPrepaidServiceAvailableSlots(payload),
    {
      enabled: payload.enabled,
    }
  );
}