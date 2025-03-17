import { useMutation } from "react-query";
import { MicrosoftCalendarAccessDTO, IntegrationResponse } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { INTEGRATION_MICROSOFT_CALENDAR } from "@app/modules";

export const useMicrosoftCalendarMutation = () => {
    return useMutation<AxiosResponse<IntegrationResponse>, AxiosError, MicrosoftCalendarAccessDTO>(
        INTEGRATION_MICROSOFT_CALENDAR,
        payload => ApiClient.Integration.integrationControllerMicrosoftCalendar(payload),
    );
};