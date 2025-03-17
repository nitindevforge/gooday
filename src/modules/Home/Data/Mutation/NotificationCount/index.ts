import { useQuery } from "react-query";
import { ApiClient } from "@app/api";
import { NotificationCountDTO } from "@gooday_corp/gooday-api-client";
import { NOTIFICATION_COUNT } from "@app/modules";


export const useNotificationCountMutation = (payload: NotificationCountDTO) => {
  return useQuery([...NOTIFICATION_COUNT, payload.category.join(',')], () =>
    ApiClient.Notification.notificationControllerNotificationCount(payload)
  );
};