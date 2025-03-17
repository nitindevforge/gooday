import { useMutation } from "react-query";
import { CalendarAccessDTO, IntegrationResponse } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { INTEGRATION_GOOGLE_CALENDAR } from "@app/modules";

export const useGoogleCalendarMutation = () => {
    return useMutation<AxiosResponse<IntegrationResponse>, AxiosError, CalendarAccessDTO>(
        INTEGRATION_GOOGLE_CALENDAR,
        payload => ApiClient.Integration.integrationControllerGoogleCalendarAccess(payload),
    );
};