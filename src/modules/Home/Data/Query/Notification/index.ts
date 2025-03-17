import { useInfiniteQuery } from "react-query";
import { GetNotificationDTO } from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import { NOTIFICATION_LIST } from "@app/modules";

export const useGetNotification = (type: string[]) => {
  return useInfiniteQuery<AxiosResponse<GetNotificationDTO>, AxiosError>(
    [NOTIFICATION_LIST, type],
    ({ pageParam = 0 }) =>
      ApiClient.Notification.notificationControllerGetNotification(
        pageParam + 1,
        10,
        type as any
      ),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.data?.data?.length) {
          return pages?.length;
        }
        return undefined;
      },
    }
  );
};
