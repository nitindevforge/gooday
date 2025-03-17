import {
  Button,
  Calendar,
  EmptyComponent,
  getCalendarDatesForWeeks,
  Loading,
  ProgressBar,
  Typography,
} from "@app/ui";
import React, { useState } from "react";
import { Alert, FlatList, SafeAreaView, View } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  TimeChip,
  useBookingAvailability,
  useCreateWaitlistMutation,
  useGetAvailableSlots,
  useGetUser,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { getFormattedDate, getWithoutMore } from "@app/utils";
import moment from "moment";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
import { CalendarSlots } from "@gooday_corp/gooday-api-client";
import clsx from "clsx";

export const AvailabilitiesContainer = () => {
  const tailwind = useTailwind();
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { booking, updateBooking, resetBooking } = useUserBooking();
  const { mutate, isLoading: isWaitlistLoading } = useCreateWaitlistMutation();
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "AVAILABILITIES">>();
  const [date, setDate] = useState<Date>(params.date || new Date());
  const [active, setActive] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const { data, isLoading } = useBookingAvailability({
    booking,
    startDate: moment(getCalendarDatesForWeeks(date)?.[0]).format(),
    endDate: moment(getCalendarDatesForWeeks(date)?.[getCalendarDatesForWeeks(date)?.length - 1]).format(),
  });

  const { data: daySlots, isLoading: isDaySlotsLoading } = useBookingAvailability({
    booking,
    startDate: new Date(moment(date).startOf("day").format())?.toISOString(),
    endDate: new Date(moment(date).endOf("day").format())?.toISOString(),
  });
  const onTimeChipPress = (slot: CalendarSlots) => {
    updateBooking({
      from: moment(slot?.start).format('HH:mm'),
      to: moment(slot?.end).format('HH:mm'),
      startDate: new Date(slot?.start),
      endDate: new Date(slot?.end),
      date: date.toString(),
    });
    setActive(slot);

    if (!(slot?.unavailableFriends?.length > 0 ||
      slot?.unavailableStaffs?.length > 0) && !slot?.isAvailable) {
      setLoading(true);
      Alert.alert("Are you sure?",
        `${booking?.venueObj.business?.name} not available at this time. Would you still like to join the waitlist?`,
        [
          {
            onPress: () => {
              updateBooking({
                from: '',
                to: '',
                startDate: null,
                endDate: null,
                date: '',
              });
              setActive(null)
              setLoading(false);
            },
            text: "Nevermind"
          },
          {
            onPress: () => {
              mutate(
                {
                  ...booking,
                  user: user?.data?.data?._id!,
                  startDate: booking?.startDate?.toString()! || new Date(slot?.start),
                  endDate: booking?.endDate?.toString()! || new Date(slot?.end),
                  venue: booking?.venue,
                  business: booking?.business,
                  method: "APP",
                  collaborators: booking?.collaborators,
                }, {
                onSuccess: () => {
                  Alert.alert("Confirmed!", "We will notify you as soon as a spot becomes available!",
                    [
                      {
                        text: "Continue"
                      },
                      {
                        onPress: () => {
                          navigation.navigate("HOMEPAGE");
                          resetBooking();
                        },
                        text: "Homepage"
                      }
                    ]
                  )
                },
              });
              setLoading(false);
            },
            text: "Confirm"
          }
        ]
      )
    }
  };

  const onBooking = () => {
    navigation?.navigate("BOOKING_DETAILS")
  }

  const getButtonActivity = () => {
    if (loading || (active?.unavailableFriends?.length > 0 || active?.unavailableStaffs?.length > 0)) {
      return true
    } else if (!!booking?.startDate && !!booking?.endDate) {
      return false
    } else {
      return true
    }
  }

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <Loading loading={isWaitlistLoading || isLoading || isDaySlotsLoading || isUserLoading} />
      <View style={tailwind("px-6 flex-1")}>
        <View style={tailwind("flex-1")}>
          <ProgressBar progress={60} className="mt-4" />
          <HeaderWithLogo
            title="Select a date"
            className="mt-6"
          />
          <View
            style={tailwind("mt-8 flex-row items-center justify-between")}
          >
            <View>
              <Typography weight="medium" variant="xl" className="">
                {getFormattedDate("dddd, DD MMMM YYYY", date)}
              </Typography>
            </View>
          </View>
          <View style={tailwind("")}>
            <Calendar
              view="weekly"
              variant="secondary"
              slots={data?.data?.data as unknown as []}
              date={date}
              onPress={(date) => {
                updateBooking({
                  from: "",
                  to: "",
                });
                setDate(date);
                setActive({})
              }}
              selectedDateFromMonth={new Date(params.date)}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={daySlots?.data?.data?.[0]?.slots}
            renderItem={({ item, index }) => (
              <View
                style={[
                  tailwind("w-1/3"),
                  index % 3 !== 0 ? tailwind("pl-4") : {},
                ]}
              >
                <TimeChip
                  date={booking?.startDate}
                  onPress={onTimeChipPress}
                  slot={booking?.startDate}
                  slide={item}
                  disable={!item?.isAvailable}
                  hasConflict={item?.unavailableFriends?.length > 0 || item?.unavailableStaffs?.length > 0}
                  style={tailwind(clsx("w-full", {}))}
                />
              </View>
            )}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: "flex-start",
            }}
            contentContainerStyle={[
              tailwind("py-4"),
              {
                gap: 12,
              },
            ]}
            ListEmptyComponent={
              <View style={tailwind("items-center mt-5")}>
                {!isDaySlotsLoading && (
                  <EmptyComponent massage="No slots Available!" />
                )}
              </View>
            }
            keyExtractor={(item) => item?.start}
          />
        </View>
        <View style={tailwind("")}>
          {!daySlots?.data?.data?.[0]?.slots?.length ? (
            <Typography weight="medium" color="gray-400" variant="sm">
              Unavailable, join the wait list here!
            </Typography>
          ) : (
            ""
          )}
          <Typography weight="medium" color="error" variant="sm">
            {getWithoutMore([...(active?.unavailableFriends ?? []), ...(active?.unavailableStaffs ?? [])], "is unavailable at this time!")}
          </Typography>
          <Button
            loading={false}
            disabled={getButtonActivity()}
            onPress={onBooking}
            className="mb-4 mt-2"
            title="Next"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
