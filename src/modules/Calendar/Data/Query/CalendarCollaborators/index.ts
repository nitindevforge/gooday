import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { CALENDAR_INVITE_COLLABORATORS } from "@app/modules";

export const useGetCalendarCollaborators = (id: string) => {
  return useQuery<AxiosResponse<void>, AxiosError>(
    [CALENDAR_INVITE_COLLABORATORS, id],
    () => ApiClient.Calendar.calendarControllerCollaboratorsByCalendar(id),
    {
      enabled: !!id
    }
  );
};
