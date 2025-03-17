import { Button, Calendar, Icon, Loading, ProgressBar, Typography } from "@app/ui";
import React, { useState } from "react";
import { Dimensions, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  useBookingAvailability,
  useGetAvailableSlots,
  useGetUser,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
import moment from "moment";
import { checkMonth, getDatesBefore, getFormattedDate } from "@app/utils";
import { Assistant } from "@app/components";

export const BookingContainer = () => {
  const tailwind = useTailwind();
  const { data: user } = useGetUser();
  const [date, setDate] = useState<Date>(new Date());
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { booking } = useUserBooking();
  const [slotsMonth, setSlotsMonth] = useState(date);

  const { data, isLoading } = useBookingAvailability({
    booking,
    startDate: moment(slotsMonth).startOf("month").toISOString(),
    endDate: moment(slotsMonth).endOf("month").toISOString()
  });

  const onNextPress = () => {
    navigation?.navigate("AVAILABILITIES", { date: date });
  };
  const onChangeMonth = (prev: boolean = false) => {
    const currentMonth = moment(date);
    const month = prev
      ? currentMonth.clone().subtract(1, "months")
      : currentMonth.clone().add(1, "months");
    setSlotsMonth(month);
    setDate(
      checkMonth(month!) ? moment() : moment(month).startOf("month")
    );
  };

  return (
    <>
      <SafeAreaView style={tailwind("flex-1")}>
        <Loading loading={isLoading} />
        <View style={tailwind("px-6 flex-1")}>
          <View style={tailwind("flex-1")}>
            <ProgressBar progress={(booking?.progress ?? 0)! > 0 ? booking?.progress : 20} className="mt-4" />
            <HeaderWithLogo
              title="Select a date"
              className="mt-6"
            />
            <ScrollView showsVerticalScrollIndicator={false} style={tailwind("flex-1")}>
              <View style={tailwind("mt-6")}>
                <ImageBackground
                  style={tailwind("rounded-20 overflow-hidden p-5 items-end")}
                  source={require("../../../../assets/Images/booking.png")}
                >

                  <Assistant
                    id={user?.data?.data?.assistant}
                    style={{
                      position: "absolute",
                      left: 20,
                      width: Dimensions.get('screen').width * 0.3,
                      height: Dimensions.get('screen').height * 0.3,
                      zIndex: 0,
                    }}
                    resizeMode="cover"
                  />
                  <View style={tailwind("max-w-[200px]")}>
                    <Typography weight="medium" variant="17" color="white">
                      Have a Gooday!
                    </Typography>
                    <Typography weight="medium" variant="xs" color="white">
                      Blue dots indicate mutual availability for you and your
                      friends!
                    </Typography>
                  </View>
                </ImageBackground>
              </View>
              <View style={tailwind("flex-row items-center mt-10 mb-2 px-2")}>
                <TouchableOpacity
                  disabled={checkMonth(date)}
                  style={tailwind('flex-1')}
                  onPress={() => onChangeMonth(true)}
                >
                  <Icon
                    fill={
                      checkMonth(date)
                        ? "#DADADA"
                        : "#2E2E2E"
                    }
                    name="back"
                    stroke="none"
                    width={10}
                    height={20}
                  />
                </TouchableOpacity>

                <Typography weight="medium" variant="xl">
                  {getFormattedDate("MMMM YYYY", date)}
                </Typography>
                <TouchableOpacity
                  style={[
                    tailwind('flex-1'),
                    {
                      transform: [{ rotate: "180deg" }],
                    },
                  ]}
                  onPress={() => onChangeMonth()}
                >
                  <Icon
                    fill={false ? "#DADADA" : "#2E2E2E"}
                    name="back"
                    stroke="none"
                    width={10}
                    height={20}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  tailwind("mt-6"),
                ]}
              >
                <Calendar
                  view="monthly"
                  variant="secondary"
                  slots={data?.data?.data as unknown as []}
                  date={date}
                  onPress={(date) => setDate(date)}
                  disabledDates={getDatesBefore()}
                />
              </View>
            </ScrollView>
          </View>
          <Button
            loading={false}
            disabled={!date && true}
            onPress={onNextPress}
            className="mb-4 mt-8"
            title="Next"
          />
        </View>
      </SafeAreaView>
    </>
  );
};
