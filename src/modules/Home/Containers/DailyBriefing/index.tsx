import { useTailwind } from "tailwind-rn";
import React, { FC, useMemo } from "react";
import { Button, Typography, Icon, Loading } from "@app/ui";
import {
  Image,
  Platform,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BookingDetailsModal,
  DailyBriefingCard,
  Header,
  HomeNavigationParamList,
  shadowStyles,
  useGetEvents,
  useGetUser,
  useUpdateStreak,
} from "@app/modules";
import { storageService } from "@app/services";
import { DAILY_BRIEFING } from "@app/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFormattedDate, getKeyWithUserID } from "@app/utils";
import { Assistant } from "@app/components";
import { EventResponse } from "@gooday_corp/gooday-api-client";
import NiceModal from "@ebay/nice-modal-react";
import { RootNavigationParamList } from "@app/navigation";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import clsx from "clsx";

export const DailyBriefingContainer: FC<{ showNextButton?: boolean }> = ({
  showNextButton,
}) => {
  const tailwind = useTailwind();
  const { calendarEvents, isLoading } = useGetEvents(new Date(), "month");
  const { mutateAsync } = useUpdateStreak();
  const { data } = useGetUser();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        HomeNavigationParamList &
        RootNavigationParamList &
        BottomTabsNavigatorList
      >
    >();

  const events = useMemo(() => {
    const today = new Date();
    const eventsData: Array<{
      header: string;
      title: string;
      subTitle: string;
      data: EventResponse[];
      width: number;
      empty: boolean;
    }> = [];
    today.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const todayEvents = calendarEvents.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);

      return eventStartDate <= endOfDay && eventEndDate >= today;
    });
    eventsData.push({
      header: "Today’s Schedule",
      width: 200,
      empty: !todayEvents.length,
      data: todayEvents.length
        ? (todayEvents?.slice(0, 10) as EventResponse[])
        : [{}],
      title: "Your Day, Your Way",
      subTitle: "Schedule time with a friend or make time for yourself",
    });

    const upcomingEvents = calendarEvents.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      const startDate = new Date().setHours(23, 59, 59, 999);

      return eventStartDate > new Date(startDate);
    });

    eventsData.push({
      header: "Coming Up",
      width: 130,
      empty: !upcomingEvents.length,
      data: upcomingEvents.length
        ? (upcomingEvents?.slice(0, 10) as EventResponse[])
        : [{}],
      title: "No Plans? Make Plans!",
      subTitle: "Make plans with a friend or make plans for yourself",
    });
    return eventsData;
  }, [calendarEvents]);

  const updateActivity = async () => {
    await mutateAsync();
    const key = await getKeyWithUserID(DAILY_BRIEFING);
    await storageService.setItem(key, getFormattedDate("L"));
    if (data?.data?.data?.role === "business") {
      navigation.replace("APP", {
        screen: "HOME",
        params: {
          screen: "BUSINESS_HOME",
        },
      } as any);
    } else {
      navigation.replace("APP");
    }
  };

  return (
    <SafeAreaView style={[tailwind("flex-1")]}>
      <Loading loading={isLoading} />
      {!isLoading && (
        <View style={tailwind("flex-1")}>
          <View
            style={tailwind(
              clsx("flex-row mt-4 px-6", {
                "mt-4": Platform.OS === "android",
              })
            )}
          >
            <Typography weight="semibold" variant="2xl">
              Daily Briefing
            </Typography>
            {!!showNextButton && (
              <TouchableOpacity
                onPress={updateActivity}
                activeOpacity={0.1}
                style={[tailwind("flex-1 justify-end flex-row"), { gap: 12 }]}
              >
                <Icon name="home" width={22} height={22} />
                <Icon
                  name="back"
                  style={{
                    transform: [
                      {
                        rotate: "180deg",
                      },
                    ],
                  }}
                  width={14}
                  height={22}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={[tailwind("flex-1 mt-4"), { gap: 20 }]}>
            <View style={[tailwind("flex-row items-center px-6"), { gap: 22 }]}>
              <Assistant
                profile
                resizeMode="contain"
                style={{ width: 110, height: 110 }}
              />

              <View style={[tailwind("")]}>
                <View style={[tailwind("flex-row"), { gap: 6 }]}>
                  <Typography weight="semibold" variant="xl">
                    Gooday,
                  </Typography>
                  <Typography variant="xl">
                    {data?.data?.data?.firstName}
                  </Typography>
                </View>
                <View style={[tailwind("flex-row items-center p-0 m-0"), {}]}>
                  <Typography variant="sm" color="gray-300" weight="medium">
                    {getFormattedDate("DD/MM")}
                  </Typography>
                  <Header className="p-0 ml-3" showIcon={false} />
                </View>
                <Button
                  title="Let’s chat!"
                  color="secondary"
                  size="small"
                  className="mt-1 h-10"
                  onPress={() =>
                    navigation.navigate("DAILY_BRIEFING_CHAT", {
                      showNextButton: showNextButton!,
                    })
                  }
                />
              </View>
            </View>
            <SectionList
              sections={events}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index, section, separators }) => {
                return (
                  <View
                    style={[
                      tailwind(
                        clsx("py-1 mx-6", {
                          "pt-2 rounded-t-xl": index === 0,
                          "pb-2 rounded-b-xl":
                            section.data.length - 1 === index,
                        })
                      ),
                      { backgroundColor: "#79C2EC26" },
                    ]}
                  >
                    {section.empty ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          tailwind("bg-white rounded-xl mx-2"),
                          shadowStyles.boxShadow,
                        ]}
                      >
                        <View
                          style={[
                            tailwind("flex-row items-start flex-1 p-2"),
                            { gap: 6 },
                          ]}
                        >
                          <View style={[tailwind("flex-1"), { gap: 6 }]}>
                            <Typography
                              numberOfLines={1}
                              weight="semibold"
                              variant="xl"
                            >
                              {section?.title}
                            </Typography>
                            <Typography
                              numberOfLines={2}
                              weight="medium"
                              variant="base"
                            >
                              {section?.subTitle}
                            </Typography>
                          </View>
                          <Image
                            style={[
                              tailwind("rounded-xl"),
                              { width: 90, height: 90 },
                            ]}
                            resizeMode="cover"
                            defaultSource={require("../../../../assets/Images/logo-primary.png")}
                          />
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <DailyBriefingCard
                        item={item}
                        user={data?.data?.data!}
                        onView={() => {
                          NiceModal?.show(BookingDetailsModal, {
                            data: item,
                          });
                        }}
                      />
                    )}
                  </View>
                );
              }}
              contentContainerStyle={tailwind("")}
              renderSectionHeader={({ section: { header } }) => {
                return (
                  <View style={[tailwind("bg-white px-6 py-2"), { gap: 4 }]}>
                    <Typography weight="semibold" variant="2xl">
                      {header}
                    </Typography>
                    <Image
                      source={require("../../../../assets/Images/stroke-line.png")}
                      style={{
                        width: events?.find((ele) => ele?.header === header)
                          ?.width,
                      }}
                      resizeMode="stretch"
                    />
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={{ gap: 44 }}>
                    {[
                      {
                        header: "Today’s Schedule",
                        title: "Your Day, Your Way",
                        width: 200,
                        subTitle:
                          "Schedule time with a friend or make time for yourself",
                      },
                      {
                        header: "Coming Up",
                        title: "No Plans? Make Plans!",
                        width: 130,
                        subTitle:
                          "Make plans with a friend or make plans for yourself",
                      },
                    ]?.map((ele) => {
                      return (
                        <View style={{ gap: 22 }}>
                          <View
                            style={[tailwind("bg-white px-6 py-2"), { gap: 4 }]}
                          >
                            <Typography weight="semibold" variant="2xl">
                              {ele?.header}
                            </Typography>
                            <Image
                              source={require("../../../../assets/Images/stroke-line.png")}
                              style={{ width: ele?.width }}
                              resizeMode="stretch"
                            />
                          </View>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                              tailwind("bg-white rounded-xl mx-6"),
                              shadowStyles.boxShadow,
                            ]}
                          >
                            <View
                              style={[
                                tailwind("flex-row items-start flex-1 p-4"),
                                { gap: 6 },
                              ]}
                            >
                              <View style={[tailwind("flex-1"), { gap: 6 }]}>
                                <Typography
                                  numberOfLines={1}
                                  weight="semibold"
                                  variant="xl"
                                >
                                  {ele?.title}
                                </Typography>
                                <Typography
                                  numberOfLines={2}
                                  weight="medium"
                                  variant="base"
                                >
                                  {ele?.subTitle}
                                </Typography>
                              </View>
                              <Image
                                style={[
                                  tailwind("rounded-xl"),
                                  { width: 90, height: 90 },
                                ]}
                                resizeMode="cover"
                                defaultSource={require("../../../../assets/Images/logo-primary.png")}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                );
              }}
              SectionSeparatorComponent={() => (
                <View style={tailwind("py-1")} />
              )}
            // ItemSeparatorComponent={() => <View style={[tailwind('py-0.5'),{backgroundColor: '#79C2EC26'}]} />}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
