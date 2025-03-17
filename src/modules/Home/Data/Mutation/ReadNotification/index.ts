import { useMutation, useQueryClient } from "react-query";
import { NotificationReadDTO, NotificationReadResponseDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { NOTIFICATION_COUNT, NOTIFICATION_READ } from "@app/modules";

export const useReadNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<NotificationReadResponseDTO>, AxiosError, NotificationReadDTO>(
    NOTIFICATION_READ,
    (payload) => ApiClient.Notification.notificationControllerReadNotification(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(NOTIFICATION_COUNT);
      }
    }
  );
};
