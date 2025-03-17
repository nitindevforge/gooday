import { useMutation, useQueryClient } from "react-query";
import {
  NotificationActionEventPayload,
  NotificationActionEventResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { ApiClient } from "@app/api";
import { AxiosError, AxiosResponse } from "axios";
import {
  BOOKING_EVENTS,
  CALENDAR_LISTING,
  CALENDAR_SLOTS,
  MY_FRIENDS,
  NOTIFICATION_ACTION,
  NOTIFICATION_COUNT,
  NOTIFICATION_LIST,
  TODO_LIST,
} from "@app/modules";
import { Alert } from "react-native";
export const useNotificationActionMutation = (cb?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<NotificationActionEventResponseDTO>,
    AxiosError,
    NotificationActionEventPayload
  >(
    NOTIFICATION_ACTION,
    (payload) =>
      ApiClient.Notification.notificationControllerActionEventEmitter(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(NOTIFICATION_COUNT);
        queryClient.invalidateQueries(CALENDAR_LISTING);
        queryClient.invalidateQueries(CALENDAR_SLOTS);
        queryClient.invalidateQueries(BOOKING_EVENTS);
        queryClient.invalidateQueries(TODO_LIST);
        queryClient.invalidateQueries(NOTIFICATION_LIST);
        queryClient.invalidateQueries(MY_FRIENDS);
        if (cb) {
          cb();
        }
      },
      onError(error) {
        Alert.alert("Error", error.response?.data?.message ?? error.message ?? 'Something went wrong!!!');
      },
    }
  );
};
