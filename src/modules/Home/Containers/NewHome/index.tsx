import React, { useEffect, useMemo, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  CategoryCard,
  CreateEventModal,
  EventDetailsViewCard,
  FriendList,
  Header,
  HomeNavigationParamList,
  ListComponents,
  shadowStyles,
  useBusinessType,
  useCustomerBooking,
  useGetBusinessVenueFriends,
  useGetCalendarBookingEvents,
  useGetListEvents,
  useGetSocialEvents,
  useGetUser,
  useUserLocationMutation,
  useUserPermissionSyncMutation,
  VenueFavouriteCard,
  WhatsOnCard,
} from "@app/modules";
import { Loading } from "@app/ui";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  BusinessFavoriteListResponseDTO,
  BusinessTypeEntity,
  FindBookingResponseDTO,
  UserEntity,
} from "@gooday_corp/gooday-api-client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AxiosResponse } from "axios";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import moment from "moment";
import NiceModal from "@ebay/nice-modal-react";
import { getFormattedDate, getKeyWithUserID } from "@app/utils";
import { DAILY_BRIEFING } from "@app/api";
import { storageService } from "@app/services";
import GetLocation from "react-native-get-location";
import Purchases from "react-native-purchases";
import { checkNotifications } from "react-native-permissions";
import { useCalendar, useOpenEventModalById, useUserBooking } from "@app/common";
// import messaging from "@react-native-firebase/messaging";
import notifee, { EventType } from "@notifee/react-native";
import { MAX_MONTHS, TOTAL_MONTH_BUFFER } from "../../../../modules/Calendar/Components/InfiniteCalendar/constants";

const SOCIAL_CALENDARS = [
  {
    title: "Catherine’s Birthday",
    startDate: new Date().setHours(10),
    endDate: new Date().setHours(11),
    collaborators: [{}, {}],
    image: require("@app/assets/Images/picture1.png"),
  },
  {
    title: "Cousin Christmas Party",
    startDate: new Date(new Date().getDate() - 1).setHours(10),
    endDate: new Date(new Date().getDate() - 1).setHours(11),
    collaborators: [{}],
    image: require("@app/assets/Images/picture.png"),
  },
];

const VENUS = [
  {
    business: {
      name: "Cousin Christmas Party",
    },
    startDate: new Date().setHours(9),
    endDate: new Date().setHours(10),
    collaborators: [{}, {}],
    image: require("@app/assets/Images/picture.png"),
    favoriteCount: 2,
    location: {
      meta: {
        shortFormattedAddress: "Kogarah, NSW 2217",
      },
    },
  },
  {
    business: {
      name: "Catherine’s Birthday",
    },
    startDate: new Date(new Date().getDate() - 1).setHours(12),
    endDate: new Date(new Date().getDate() - 1).setHours(1),
    collaborators: [{}],
    image: require("@app/assets/Images/picture1.png"),
    favoriteCount: 3,
    location: {
      meta: {
        shortFormattedAddress: "Sydney",
      },
    },
  },
  {
    business: {
      name: " Live Music",
    },
    startDate: new Date(new Date().getDate() + 2).setHours(2),
    endDate: new Date(new Date().getDate() + 2).setHours(3),
    collaborators: [{}],
    image: require("@app/assets/Images/picture2.png"),
    favoriteCount: 1,
    location: {
      meta: {
        shortFormattedAddress: "Sydney",
      },
    },
  },
];

export const NewHomeContainer = () => {
  const isFocused = useIsFocused();
  const tailwind = useTailwind();
  const { updateBooking } = useUserBooking();
  const { data: businessTypes } = useBusinessType(true);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        HomeNavigationParamList & BottomTabsNavigatorList
      >
    >();
  const [isBriefing, setBriefing] = useState<boolean>(false);
  const { mutate } = useUserLocationMutation();
  const { data, isLoading: isUserLoading } = useGetUser();
  const user: UserEntity = data?.data?.data!;
  const { mutate: onPermission } = useUserPermissionSyncMutation();
  const { openEventModalById, isLoading: isEventLoading } = useOpenEventModalById();

  // Start 
  const { calendar } = useCalendar();
  const allMonths = useMemo(() => {
    return Array.from({ length: MAX_MONTHS * 2 }, (_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() + MAX_MONTHS - index);
      date.setDate(1);

      return date.toISOString().split("T")[0];
    }).reverse();
  }, []);

  const currentMonthIndex = MAX_MONTHS - 1;

  const [currentRange] = useState([
    currentMonthIndex - TOTAL_MONTH_BUFFER,
    currentMonthIndex + TOTAL_MONTH_BUFFER,
  ]);

  const [currentRangeStartIndex, currentRangeEndIndex] = currentRange;

  const currentRangeStartDay = allMonths[currentRangeStartIndex];
  const currentRangeEndDay = allMonths[currentRangeEndIndex];

  useGetCalendarBookingEvents({
    startDate: new Date(currentRangeStartDay).toISOString(),
    endDate: new Date(currentRangeEndDay).toISOString(),
    calendar: calendar?._id ?? "",
    view: "monthly",
  });

  useGetSocialEvents({
    startDate: new Date(currentRangeStartDay).toISOString(),
    endDate: new Date(currentRangeEndDay).toISOString(),
    calendar: calendar?._id ?? "",
    view: "monthly",
  })
  // End 

  const onPress = (item: BusinessTypeEntity) => {
    if (item?._id === "favorite") {
      navigation?.navigate("FIND_VENUE", {
        categoryId: item?._id,
        title: item?.name,
      });
    } else {
      navigation?.navigate("CATEGORIES", { type: item });
    }
  };

  const { data: whatsOn, isLoading: isWhatsOn } = useCustomerBooking({
    whatsOn: true,
  });

  const { data: friendVenues, isLoading: isFDVenueLoading } =
    useGetBusinessVenueFriends();

  const friendVenuesList = useMemo(() => {
    const friendVenuesList = friendVenues?.pages?.reduce(
      (
        acc: BusinessFavoriteListResponseDTO["data"],
        page: AxiosResponse<BusinessFavoriteListResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return friendVenuesList ?? [];
  }, [friendVenues]);

  const whatsOnList = useMemo(() => {
    const whatsOnList = whatsOn?.pages?.reduce(
      (
        acc: FindBookingResponseDTO["data"],
        page: AxiosResponse<FindBookingResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return whatsOnList ?? [];
  }, [whatsOn]);

  const { calendarEvents, isLoading } = useGetListEvents(moment(), "month");

  useEffect(() => {
    (async () => {
      const key = await getKeyWithUserID(DAILY_BRIEFING);
      const checkDailyBriefing = await storageService.getItem(key);
      const currentDate = getFormattedDate("L");
      if (checkDailyBriefing !== currentDate) {
        setBriefing(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let notification = await checkNotifications();
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });

        onPermission({
          locationAccessPermission: true,
          booking: notification.status === "granted",
          calendar: notification.status === "granted",
          invites: notification.status === "granted",
          reminders: notification.status === "granted",
          waitlist: notification.status === "granted",
          tasks: notification.status === "granted",
        });
        mutate({
          location: [location?.longitude, location?.latitude],
          timezone: moment.tz.guess(),
        });
      } catch (error) {
        onPermission({
          locationAccessPermission: true,
          booking: notification.status === "granted",
          calendar: notification.status === "granted",
          invites: notification.status === "granted",
          reminders: notification.status === "granted",
          waitlist: notification.status === "granted",
          tasks: notification.status === "granted",
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (user?._id) {
      (async () => {
        await Purchases.logIn(user?._id);
        await Purchases.setEmail(user?.email);
      })();
    }
  }, [user]);
  const onNavigate = async () => {
    navigation.navigate("BUSINESS_TYPE");
  };

  useEffect(() => {
    // messaging().onNotificationOpenedApp(async (remoteMessage) => {
    //   const { data } = remoteMessage;
    //   if (data?.event) {
    //     openEventModalById(data?.event as string, "event");
    //   } else if (data?.bookingId) {
    //     openEventModalById(data?.bookingId as string, "booking");
    //   } else {
    //     navigation.navigate("NOTIFICATION");
    //   }
    // });
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.PRESS:
          if (detail.notification?.data?.event) {
            openEventModalById(
              detail.notification?.data?.event as string,
              "event"
            );
          } else if (detail.notification?.data?.bookingId) {
            openEventModalById(
              detail.notification?.data?.bookingId as string,
              "booking"
            );
          } else {
            navigation.navigate("NOTIFICATION");
          }
          break;
      }
    });
  }, []);

  return (
    <>
      <Loading
        loading={isWhatsOn || isLoading || isFDVenueLoading || isUserLoading || isEventLoading}
      />
      {isFocused && (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("flex-1")}>
          <Header />
          <View style={tailwind("px-2 mb-5")}>
            <Image
              resizeMode="contain"
              source={require("../../../../assets/Images/gooday.png")}
              style={{ width: 164, height: 44 }}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[{ rowGap: 22 }, tailwind("pb-2")]}>
              <View style={tailwind("")}>
                <FriendList />
              </View>
              <ListComponents
                title="Make A Booking"
                data={businessTypes?.data.data ?? []}
                onHeaderPress={onNavigate}
                renderItem={({ item }) => (
                  <CategoryCard
                    onPress={() => onPress(item)}
                    key={item?.id}
                    title={item?.name}
                    bgImage={item?.images?.small}
                    style={[
                      tailwind("rounded-lg my-0"),
                      { width: 175, height: 100, borderRadius: 8 },
                    ]}
                  />
                )}
                width={175}
                height={100}
              />
              <ListComponents
                title="Your Social Calendar"
                data={
                  calendarEvents?.length
                    ? calendarEvents?.slice(0, 10)
                    : SOCIAL_CALENDARS
                }
                width={175}
                height={135}
                onAdd={() => {
                  NiceModal?.show(CreateEventModal);
                }}
                onHeaderPress={() =>
                  navigation.navigate("CALENDAR_EVENTS_LIST")
                }
                renderItem={({ item }) => (
                  <EventDetailsViewCard
                    disabled={calendarEvents?.length <= 0}
                    item={item}
                    width={175}
                    style={{
                      width: 175,
                      height: 135,
                      maxHeight: "auto",
                      opacity: !(
                        calendarEvents?.length ||
                        whatsOnList?.length ||
                        friendVenuesList?.length
                      )
                        ? 0.5
                        : 1,
                    }}
                  />
                )}
              />
              <ListComponents
                title="What’s On"
                onHeaderPress={() => navigation.navigate("WHATS_ON_BOOKING")}
                data={whatsOnList?.length ? whatsOnList : VENUS?.reverse()}
                renderItem={({ item }) => (
                  <WhatsOnCard
                    disabled={whatsOnList?.length <= 0}
                    item={item}
                    width={172}
                    style={{
                      width: 172,
                      height: 135,
                      maxHeight: "auto",
                      opacity: whatsOnList?.length ? 1 : 0.5,
                    }}
                    onNavigateCb={() => {
                      if (item?.whatsOn) {
                        updateBooking({
                          venueObj: {
                            ...item?.venue,
                            business: item.business,
                          },
                          venue: item?.venue?._id,
                          business: item.business?._id,
                        });
                        navigation?.navigate("EVENT_DETAILS", {
                          data: item?.whatsOn,
                        });
                      }
                    }}
                  />
                )}
              />

              {
                <ListComponents
                  title="Friends Favourites"
                  empty="Add friends to share favourite places!"
                  data={friendVenuesList?.length ? friendVenuesList : VENUS}
                  onAdd={
                    friendVenuesList?.length
                      ? undefined
                      : () => {
                        navigation.navigate("PROFILE", {
                          screen: "PROFILE_PAGE",
                          params: {
                            tab: "Friends",
                          },
                        } as any);
                      }
                  }
                  width={175}
                  height={135}
                  onHeaderPress={() =>
                    navigation.navigate("FRIENDS_FAVORITE_VENUES", {
                      back: "Home",
                    })
                  }
                  renderItem={({ item }) => (
                    <View
                      style={[
                        shadowStyles.boxShadow1,
                        { width: 175, height: 135, maxHeight: "auto" },
                      ]}
                    >
                      <VenueFavouriteCard
                        disabled={friendVenuesList?.length <= 0}
                        item={item}
                        width={175}
                        style={{
                          width: 175,
                          height: 135,
                          maxHeight: "auto",
                          opacity: !(
                            calendarEvents?.length ||
                            whatsOnList?.length ||
                            friendVenuesList?.length
                          )
                            ? 0.5
                            : 1,
                        }}
                      />
                    </View>
                  )}
                />
              }
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
