import React, { Fragment, useMemo } from "react";
import {
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  NOTIFICATION,
  NotificationCard,
  useGetNotification,
  useReadNotificationMutation,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { EmptyComponent, Loading, Typography } from "@app/ui";
import {
  GetNotificationDTO,
  NotificationEntityTypeEnum,
} from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NotificationCardProps } from "../../Components/NotificationCard/type";
import moment from "moment";
import { capitalizedResult } from "@app/utils";
import { useOpenEventModalById } from "@app/common";

type FilteredNotifications = {
  title: string;
  notifications: NotificationCardProps["item"][];
};

export const NotificationContainer = () => {
  const tailwind = useTailwind();
  const { openEventModalById, isLoading } = useOpenEventModalById();

  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "NOTIFICATION">>();
  const {
    data,
    isLoading: isNotificationLoading,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useGetNotification([
    NOTIFICATION.INVITES,
    NOTIFICATION.CALENDAR,
    NOTIFICATION.TASKS,
    NOTIFICATION.BOOKING,
    NOTIFICATION.GENERAL,
    NOTIFICATION.REMINDERS,
    NOTIFICATION.WAITLIST,
  ]);
  const { mutate: readNotification, isLoading: isReadLoading } =
    useReadNotificationMutation();

  const onFetch = () => {
    fetchNextPage();
  };
  const onRefetch = () => {
    refetch();
  };
  const onRead = (id: string) => {
    readNotification(
      { notificationId: id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const filterNotifications = (
    notifications: NotificationCardProps["item"][]
  ) => {
    const dates = [
      ...new Set(notifications?.map((el) => moment(el?.createdAt).fromNow())),
    ];
    const filteredNotifications: FilteredNotifications[] = dates?.map((el) => ({
      title: el,
      data: notifications?.filter(
        (notification) => moment(notification?.createdAt).fromNow() === el
      ),
    }));
    return filteredNotifications;
  };

  const notifications = useMemo(() => {
    const notificationData = data?.pages?.reduce(
      (
        acc: GetNotificationDTO["data"],
        page: AxiosResponse<GetNotificationDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return filterNotifications(notificationData!);
  }, [data]);

  const onNavigate = (type: string, data: any) => {
    switch (type) {
      case NotificationEntityTypeEnum.EventInvite:
      case NotificationEntityTypeEnum.EventDetailsUpdate:
      case NotificationEntityTypeEnum.EventInviteAccept:
        if (data?.event) {
          openEventModalById(data?.event as string, "event");
        }
        break;

      case NotificationEntityTypeEnum.BookingCreate:
      case NotificationEntityTypeEnum.BookingAccept:
      case NotificationEntityTypeEnum.BookingReschedule:
        if (data?.bookingId) {
          openEventModalById(data?.bookingId as string, "booking");
        }
        break;

      default:
        break;
    }
  };

  return (
    <Fragment>
      <Loading loading={isNotificationLoading || isReadLoading || isLoading} />
      <SafeAreaView style={tailwind("flex-1")}>
        <StatusBar barStyle="dark-content" />
        <View style={{ paddingHorizontal: 22, flex: 1 }}>
          <HeaderWithLogo title="Notifications" />
          <SectionList
            sections={notifications}
            keyExtractor={(item, index) => item + index}
            refreshing={isRefetching}
            onRefresh={onRefetch}
            onEndReached={onFetch}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item?.isRead) {
                      onNavigate(item?.type, item?.metaData);
                    }
                  }}
                  activeOpacity={0.8}
                  style={tailwind("my-2")}
                >
                  <NotificationCard
                    item={item as NotificationCardProps["item"]}
                    onRead={onRead}
                    loading={isReadLoading || isRefetching}
                  />
                </TouchableOpacity>
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={[tailwind("bg-white pb-2")]}>
                <Typography weight="medium" variant="base">
                  {capitalizedResult(title)}
                </Typography>
              </View>
            )}
            ListEmptyComponent={
              <View style={tailwind("mt-4 flex-1 items-center justify-center")}>
                {!isNotificationLoading && (
                  <EmptyComponent massage="No notifications found!" />
                )}
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};
