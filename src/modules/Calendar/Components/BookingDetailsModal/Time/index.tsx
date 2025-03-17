import {
  Button,
  Calendar,
  EmptyComponent,
  getCalendarDatesForWeeks,
  Icon,
  Loading,
  ProgressBar,
  Typography,
} from "@app/ui";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  TimeChip,
  useBookingAvailability,
  useCreateWaitlistMutation,
  useEditBookingMutation,
  useGetAvailableSlots,
  useGetUser,
  useRescheduleBookingMutation,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { getFormattedDate, getWithoutMore } from "@app/utils";
import moment from "moment";
import { CalendarSlots } from "@gooday_corp/gooday-api-client";
import clsx from "clsx";
import { TimeProps } from "./type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BookingState } from "@app/common";

export const Availabilities: React.FC<TimeProps> = ({ data: bookingData, closeModal, reset, date: selectedDate }) => {
  const tailwind = useTailwind();
  const { data: user } = useGetUser();
  const { mutate, isLoading: isWaitlistLoading } = useCreateWaitlistMutation();
  const { mutate: updateBooking, isSuccess, isLoading: isBookingUpdateLoading } = useRescheduleBookingMutation(bookingData?._id);
  const [booking, setBooking] = useState(bookingData);
  const [date, setDate] = useState<Date>(new Date(selectedDate));
  const [active, setActive] = useState<any>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  // const { data, isLoading } = useGetAvailableSlots({
  //   business: booking?.business?._id,
  //   collaborators: booking?.collaborators?.filter((element) => element?._id !== null)?.map((el) => el?._id) || [],
  //   startDate: moment(getCalendarDatesForWeeks(selectedDate)?.[0]).format(),
  //   endDate: moment(getCalendarDatesForWeeks(selectedDate)?.[getCalendarDatesForWeeks(selectedDate)?.length - 1]).format(),
  //   view: "monthly",
  //   staffs: [],
  //   venue: bookingData?.venue?._id
  // });
  const { data, isLoading } = useBookingAvailability({
    booking: bookingData as unknown as BookingState,
    startDate: moment(getCalendarDatesForWeeks(selectedDate)?.[0]).format(),
    endDate: moment(getCalendarDatesForWeeks(selectedDate)?.[getCalendarDatesForWeeks(selectedDate)?.length - 1]).format(),
  });

  // const { data: daySlots, isLoading: isDaySlotsLoading } = useGetAvailableSlots(
  //   {
  //     business: booking?.business?._id,
  //     collaborators: booking?.collaborators?.filter((element) => element?._id !== null)?.map((el) => el?._id) || [],
  //     startDate: new Date(moment(date).startOf("day").format())?.toISOString(),
  //     endDate: new Date(moment(date).endOf("day").format())?.toISOString(),
  //     view: 'daily',
  //     staffs: [],
  //     venue: bookingData?.venue?._id
  //   }
  // );

  const { data: daySlots, isLoading: isDaySlotsLoading } = useBookingAvailability({
    booking: bookingData as unknown as BookingState,
    startDate: new Date(moment(date).startOf("day").format())?.toISOString(),
    endDate: new Date(moment(date).endOf("day").format())?.toISOString(),
  });

  useEffect(() => {
    if (bookingData?.startDate) {
      setActive(daySlots?.data?.data[0]?.slots?.find((ele) => ele?.start?.toString() === bookingData?.startDate?.toString()))
    }
  }, [bookingData, daySlots])
  const onTimeChipPress = (slot: CalendarSlots) => {
    setBooking({
      ...booking,
      startDate: slot?.start,
      endDate: slot?.end,
      from: moment(slot?.start).format('HH:mm'),
      to: moment(slot?.end).format('HH:mm'),
      date: date.toString(),
    });
    setActive(slot);
    if (!(slot?.unavailableFriends?.length > 0 ||
      slot?.unavailableStaffs?.length > 0) && !slot?.isAvailable) {
      Alert.alert("Are you sure?",
        `${booking?.venueObj.business?.name} not available at this time. Would you still like to join the waitlist?`,
        [
          {
            onPress: () => { },
            text: "Nevermind"
          },
          {
            onPress: () => {
              mutate(
                {
                  user: user?.data?.data?._id!,
                  startDate: booking?.startDate,
                  endDate: booking?.endDate,
                  venue: booking?.venue?._id,
                  business: booking?.business?._id,
                  staffs: booking?.selectedStaff ?? null,
                  method: "APP",
                  serviceId: booking?.serviceId ?? null,
                  collaborators: booking?.collaborators
                }, {
                onSuccess: () => {
                  Alert.alert("Confirmed!", "We will notify you as soon as a spot becomes available!",
                    [
                      {
                        text: "Continue"
                      },
                      {
                        onPress: () => {
                          reset!();
                          navigation.replace('HOMEPAGE')
                        },
                        text: "Homepage"
                      }
                    ]
                  )
                }
              })
            },
            text: "Confirm"
          }
        ]
      )
    }
  };
  useEffect(() => {
    if (isSuccess) {
      reset!()
      navigation.navigate('HOMEPAGE')
    }
  }, [isSuccess, navigation])

  const onBookingReschedule = () => {
    updateBooking({
      date: booking?.date,
      from: booking?.from,
      to: booking?.to,
    })
  }

  return (
    <>
      <Loading loading={isWaitlistLoading || isLoading || isDaySlotsLoading} />
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 flex-1 pt-8")}>
          <View style={tailwind("flex-1")}>
            <View style={tailwind("flex-row items-center")}>
              <TouchableOpacity
                style={tailwind("flex items-start w-7 h-11 justify-center")}
                onPress={closeModal}
              >
                <Icon
                  fill="#2E2E2E"
                  name="back"
                  stroke="none"
                  width={10}
                  height={20}
                />
              </TouchableOpacity>
              <Typography weight="medium" variant="2xl">
                Reschedule
              </Typography>
            </View>
            <View
              style={tailwind("pt-2 flex-row items-center justify-between")}
            >
              <View>
                <Typography weight="medium" variant="xl" className="">
                  {getFormattedDate("dddd Do of MMMM", date)}
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
                  setBooking({
                    ...booking,
                    startDate: "",
                    endDate: "",
                    from: "",
                    to: "",
                  });
                  setDate(date);
                  setActive({})
                }}
                selectedDateFromMonth={new Date(date)}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={3}
              data={daySlots?.data?.data?.[0]?.slots}
              renderItem={({ item, index }) => {

                return (
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
                      disable={!item?.isAvailable}
                      slide={item}
                      hasConflict={item?.unavailableFriends?.length > 0 || item?.unavailableStaffs?.length > 0}
                      style={tailwind(clsx("w-full", {}))}
                    />
                  </View>
                )
              }}
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
              {
                moment(bookingData?.startDate).toISOString() === moment(active?.start).toISOString() ?
                  "Please select new slot" :
                  [...(active?.unavailableFriends ?? []), ...(active?.unavailableStaffs ?? [])]?.map((element: any) => getWithoutMore(element, "is unavailable at this time!"))}
            </Typography>
            <Button
              loading={isBookingUpdateLoading}
              disabled={
                (active?.unavailableFriends?.length > 0 ||
                  active?.unavailableStaffs?.length > 0) ? true :
                  booking?.startDate && booking?.endDate ? false : true}
              onPress={onBookingReschedule}
              className="mb-4 mt-2"
              title="Next"
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
