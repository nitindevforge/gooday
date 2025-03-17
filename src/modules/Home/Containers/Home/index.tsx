import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  ActivityBanner,
  ActivityCard,
  ActivityCardSlide,
  DailyBriefingScreen,
  Header,
  HomeNavigationParamList,
  useGetMyCalendar,
  useGetUser,
  useUserLocationMutation,
} from "@app/modules";
import { Button, Carousel, Loading, Typography } from "@app/ui";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UserEntity } from "@gooday_corp/gooday-api-client";
import { storageService } from "@app/services";
import { DAILY_BRIEFING } from "@app/api";
import { getFormattedDate, getKeyWithUserID } from "@app/utils";
import moment from "moment-timezone";
import GetLocation from "react-native-get-location";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import { useCalendar } from "@app/common";
import Purchases from "react-native-purchases";
export const HomeContainer = () => {
  const { data, isLoading } = useGetUser();
  const isFocused = useIsFocused();
  const { calendar, updateCalendar } = useCalendar();
  const { data: calendarData } = useGetMyCalendar(!calendar?._id);
  const calendars = calendarData?.data?.data ?? [];

  const user: UserEntity = data?.data?.data!;
  const tailwind = useTailwind();
  const [showDailyBriefing, setShowDailyBriefing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useUserLocationMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const tabNavigation =
    useNavigation<NativeStackNavigationProp<BottomTabsNavigatorList>>();

  const slides: ActivityCardSlide[] = [
    {
      icon: "calendar",
      title: "Calendar",
      desc: "Another day to have a Gooday. Let me know if I can help organize your day!",
      image: require("../../../../assets/Images/first.png"),
      onPress: () => tabNavigation?.navigate("CALENDAR"),
    },
    {
      icon: "bullet-list",
      title: "To-Do List",
      desc: "What tasks do you want to action today?",
      image: require("../../../../assets/Images/second.png"),
      onPress: () => tabNavigation?.navigate("TODO"),
    },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const key = await getKeyWithUserID(DAILY_BRIEFING);
      const checkDailyBriefing = await storageService.getItem(key);
      const currentDate = getFormattedDate("L");
      if (checkDailyBriefing !== currentDate) {
        setShowDailyBriefing(true);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      mutate({
        location: [location?.longitude, location?.latitude],
        timezone: moment.tz.guess(),
      });
    })();
  }, []);

  const onNavigate = async () => {
    navigation.navigate(
      user?.role === "business" ? "STAFF_ROSTER" : "BUSINESS_TYPE"
    );
  };

  useEffect(() => {
    if (user?._id) {
      (async () => {
        await Purchases.logIn(user?._id);
        await Purchases.setEmail(user?.email);
      })();
    }
  }, [user]);

  return (
    <>
      <Loading loading={isLoading || loading} />
      {isFocused && (
        <StatusBar backgroundColor="white" barStyle="dark-content" />
      )}

      {showDailyBriefing ? (
        <DailyBriefingScreen showNextButton={true} />
      ) : (
        <SafeAreaView style={tailwind("flex-1")}>
          <View style={tailwind("flex-1")}>
            <Header />
            <View style={tailwind("px-6 mb-5")}>
              <Typography variant="xl" className="mt-1">
                Gooday,{" "}
                {user?.business?.name || user?.nickName || user?.firstName}
              </Typography>
              <Image
                source={require("../../../../assets/Images/stroke-line.png")}
              />
              <ActivityBanner />
            </View>
            <Carousel
              slides={slides}
              style={tailwind("flex-1")}
              slideComponent={ActivityCard}
            />
          </View>
          <View style={tailwind("px-6 pb-5")}>
            <Button
              onPress={onNavigate}
              size="medium"
              title={
                user?.role === "business" ? "Staff Roster" : "Make a booking"
              }
              className="bg-primary-300"
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
