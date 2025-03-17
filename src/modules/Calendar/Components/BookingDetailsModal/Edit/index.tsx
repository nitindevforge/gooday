import { Button, Calendar, Icon, LoadingUi, Typography } from "@app/ui";
import React, { useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import {
  useBookingAvailability,
  useGetAvailableSlots,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import moment from "moment";
import { checkMonth, getDatesBefore, getFormattedDate } from "@app/utils";
import { BookingEditProps } from "./type";
import { BookingState } from '../../../../../common/Hooks/useUserBooking';

export const BookingReschedule: React.FC<BookingEditProps> = ({ data: booking, changeView, closeModal, setDate, date }) => {
  const tailwind = useTailwind();
  const [slotsMonth, setSlotsMonth] = useState(booking?.startDate);
  // const { data, isLoading } = useGetAvailableSlots({
  //   business: booking?.business?._id,
  //   collaborators: booking?.collaborators?.filter((element) => element?._id !== null)?.map((el) => el?._id) || [],
  //   startDate: moment(slotsMonth).startOf("month").toISOString(),
  //   endDate: moment(slotsMonth).endOf("month").toISOString(),
  //   view: "monthly",
  //   staffs: [],
  //   venue: booking?.venue?._id
  // });

  const { data, isLoading } = useBookingAvailability({
    booking: booking as unknown as BookingState,
    startDate: moment(slotsMonth).startOf("month").toISOString(),
    endDate: moment(slotsMonth).endOf("month").toISOString()
  });
  const onNextPress = () => {
    changeView!('time')
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
        <LoadingUi loading={isLoading} />
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
            <ScrollView showsVerticalScrollIndicator={false} style={tailwind("flex-1")}>
              <View style={tailwind("pt-2")}>
                <ImageBackground
                  style={tailwind("rounded-20 overflow-hidden p-5 items-end")}
                  source={require("../../../../../assets/Images/booking.png")}
                >
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

                <Typography weight="semibold" variant="xl">
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
                  {
                    borderWidth: 3,
                    borderColor: "#DBDBDB",
                    borderRadius: 16,
                  },
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
