import { ApiClient } from "@app/api";
import {
  WhatsOnAvailabilityResponseDTO,
  WhatsOnSlotsPayload,
} from "@gooday_corp/gooday-api-client";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { WHATS_ON_SLOTS } from "../../Constants";

export const useGetWhatsOnAvailableSlots = (payload: WhatsOnSlotsPayload & { enabled: boolean }) => {
  return useQuery<AxiosResponse<WhatsOnAvailabilityResponseDTO>, AxiosError>(
    [
      WHATS_ON_SLOTS,
      payload.collaborators,
      payload.startDate,
      payload.endDate,
      payload.id,
    ],
    () => ApiClient.Calendar.calendarControllerListWhatsOnAvailableSlots(payload),
    {
      enabled: payload.enabled,
    }
  );
}