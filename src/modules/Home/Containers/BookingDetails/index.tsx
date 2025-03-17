import {
  Button,
  Dropdown,
  Icon,
  Input,
  Loading,
  ProgressBar,
  Typography,
} from "@app/ui";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  useBookingAvailabilityCheck,
  useGetMyCalendar,
  useGetUser,
  usePrepaidServiceDiscountMutation,
  useWhatsOnDiscountMutation,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  CalendarListResponse,
  TagsResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { useTags } from "../../Data/Query/Tags";
import { AxiosResponse } from "axios";
import config from "@app/config";

export const BookingDetailsContainer = () => {
  const tailwind = useTailwind();
  const { booking, updateBooking } = useUserBooking();
  const { data: user } = useGetUser();
  const { data: myCalendar, isLoading: isCalendarLoading } = useGetMyCalendar(true);
  const { mutate: onWhatsOnDiscount, data } = useWhatsOnDiscountMutation();
  const { mutate: onPrepaidServiceDiscount, data: prepaidService } = usePrepaidServiceDiscountMutation();
  const { mutate, isLoading } = useBookingAvailabilityCheck(
    user?.data?.data!,
    ((String(data?.data?.data) || prepaidService?.data?.data) ?? '')
  );
  const [coupon, setCoupon] = useState<string>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const { data: tagsData } = useTags(booking.venueObj._id, "BOOKING");

  const tags = useMemo(() => {
    return (
      tagsData?.pages
        ?.reduce(
          (
            acc: TagsResponseDTO["data"],
            page: AxiosResponse<TagsResponseDTO>
          ) => {
            return [...(acc ?? []), ...(page?.data?.data ?? [])];
          },
          []
        )?.filter(el => el.category === 'BOOKING') || []
    );
  }, [tagsData]);

  const onNextPress = () => {
    mutate()
  };

  const calendarOptions = useMemo(() => {
    let calendars = myCalendar?.data?.data;
    if (booking?.collaborators?.length) {
      calendars = calendars?.filter((calendar: CalendarListResponse) =>
        booking.collaborators.every((customer) =>
          calendar.collaborators.some(
            (collaborator) => collaborator._id === customer._id
          )
        )
      );
    }
    updateBooking({
      calendar: calendars?.length
        ? [calendars?.[0]?._id]
        : [user?.data?.data?.calendar],
    });
    return (
      calendars?.map((el) => ({
        label: el?.name,
        value: el?._id,
      })) || []
    );
  }, [myCalendar]);

  const onDiscount = () => {
    if (booking?.whatsOn) {
      onWhatsOnDiscount(
        {
          id: booking?.whatsOn!,
          name: coupon!,
        },
        {
          onError: (error) => {
            Alert.alert(
              "Error",
              error.response?.data?.message ??
              error.message ??
              "Something went wrong!!!"
            );
          },
          onSuccess: () => {
            Alert.alert(
              "",
              "Coupon code applied successfully"
            );
          },
        }
      );
    } else if (booking?.serviceId) {
      onPrepaidServiceDiscount(
        {
          id: booking?.serviceId!,
          name: coupon!,
        },
        {
          onError: (error) => {
            Alert.alert(
              "Error",
              error.response?.data?.message ??
              error.message ??
              "Something went wrong!!!"
            );
          },
          onSuccess: () => {
            Alert.alert(
              "",
              "Coupon code applied successfully"
            );
          },
        }
      );
    }
  }

  const discountComponent = () => {
    if (booking?.whatsOn || booking?.serviceId) {
      return (
        <View>
          <Input
            label="Coupon code"
            placeholder="Coupon code"
            multiline
            onChangeText={setCoupon}
            value={coupon}
            right={
              <TouchableOpacity
                activeOpacity={0.6}
                disabled={!coupon}
                style={[tailwind("flex-1 items-center justify-center right-6")]}
                onPress={onDiscount}
              >
                <Typography weight="semibold" color="primary-300">Apply</Typography>
              </TouchableOpacity>
            }
          />
        </View>
      )
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tailwind("flex-1")}>
        <Loading loading={isLoading || isCalendarLoading} />
        <View style={tailwind("px-6 flex-1")}>
          <View>
            <ProgressBar progress={80} className="mt-4" />
            <HeaderWithLogo title="Booking Details" className="mt-6" />
          </View>
          <KeyboardAwareScrollView
            style={tailwind("flex-1")}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={tailwind("flex-1")}>
              <View style={[tailwind("mt-5"), { rowGap: 15 }]}>
                <View>
                  <Typography weight="medium">Booking Policies</Typography>
                  <Typography
                    weight="medium"
                    variant="sm"
                    color="gray-400"
                    className="mt-3"
                  >
                    By clicking ‘next’, are you agree to Gooday’s{" "}
                    <Typography
                      onPress={() =>
                        navigation?.navigate("TERMS_AND_CONDITION")
                      }
                      weight="medium"
                      variant="sm"
                      color="gray-400"
                      className="underline"
                    >
                      Terms and Conditions
                    </Typography>{" "}
                    and{" "}
                    <Typography
                      onPress={() =>
                        navigation?.navigate("TERMS_AND_CONDITION")
                      }
                      weight="medium"
                      variant="sm"
                      color="gray-400"
                      className="underline"
                    >
                      privacy policy.
                    </Typography>{" "}
                    You are also agreeing to any business policies set by this
                    business.
                  </Typography>
                </View>
                {!!calendarOptions.length && (
                  <View>
                    <Dropdown
                      data={calendarOptions}
                      onChangeText={(value) =>
                        updateBooking({
                          calendar: [value],
                        })
                      }
                      label={"Select calendar"}
                      placeholder={"Select from options "}
                      selected={
                        booking?.calendar?.[0] || calendarOptions?.[0]?.value
                      }
                      labelField="label"
                      valueField="value"
                      onChange={() => { }}
                    />
                  </View>
                )}
                {!!tags?.length && <Dropdown
                  data={tags.map((tag) => ({
                    label: tag.name,
                    value: tag._id,
                  }))}
                  onChangeText={(value) => {
                    updateBooking({
                      tags: [value],
                    });
                  }}
                  label={"Add Special Occasion (Optional)"}
                  placeholder={"Select a special occasion"}
                  selected={booking.tags?.[0]}
                  labelField="label"
                  valueField="value"
                  onChange={() => { }}
                />
                }
                <View>
                  <Input
                    label="Add Special Requests (Optional)"
                    placeholder="Please provide any details necessary to ensure that your experience with this business is satisfactory."
                    multiline
                    onChangeText={(text) =>
                      updateBooking({
                        note: text,
                      })
                    }
                    value={booking?.note}
                    numberOfLines={12}
                    placeholderTextColor="#AEAEAE"
                    returnKeyType="done"
                    textAlignVertical="top"
                    height={280}
                  />
                </View>
                {config.APP_FEATURE_FLAG.discount && discountComponent()}
              </View>
            </View>
            <Button
              loading={false}
              disabled={false}
              onPress={onNextPress}
              className="mb-4 mt-8"
              title="Next"
            />
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
