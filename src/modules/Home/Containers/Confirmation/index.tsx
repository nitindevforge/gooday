import { Button, Icon, Loading, ProgressBar, Typography } from "@app/ui";
import React, { useMemo } from "react";
import { Alert, SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  useGetBooking,
  useVenueFavoriteMutation,
  useVenueUnfavoriteMutation,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFormattedDate } from "@app/utils";
import Share from "react-native-share";
import { Assistant } from "@app/components";
import clsx from "clsx";

export const ConfirmationContainer = () => {
  const tailwind = useTailwind();
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "CONFIRMATION">>();

  const {
    data,
    isLoading: isBookingLoading,
    refetch,
  } = useGetBooking(params?.bookingID);

  const { mutate, isLoading } = useVenueFavoriteMutation();
  const { mutate: unfavorite, isLoading: isUnfavoriteLoading } =
    useVenueUnfavoriteMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const bookingDetails = useMemo(() => {
    const myData = data?.data?.data;
    return {
      id: myData?._id,
      businessId: myData?.business?._id,
      name: myData?.business?.name,
      venueId: myData?.venue?._id,
      time: `${getFormattedDate("LT", myData?.startDate)} - ${getFormattedDate(
        "LT",
        myData?.endDate
      )}`,
      date: getFormattedDate("dddd, Do of MMMM YYYY", myData?.startDate),
      location: myData?.venue?.location?.meta?.formattedAddress,
      policies: myData?.business?.policies,
      favorite: myData?.favorite ? true : false,
    };
  }, [data?.data?.data]);

  const onNavigatePolicies = () => {
    navigation.navigate("POLICY", {
      policies: bookingDetails?.policies!,
      businessName: bookingDetails?.name!,
    });
  };

  const onFavoriteVenue = (isFavorite: boolean) => {
    if (bookingDetails?.venueId) {
      if (isFavorite) {
        unfavorite(
          { venue: bookingDetails?.venueId },
          {
            onSuccess: () => {
              Alert.alert(
                `${bookingDetails?.name} has now been removed from your favorites!`,
                ""
              );
              refetch();
            },
          }
        );
        return;
      }
      mutate(
        { venue: bookingDetails?.venueId },
        {
          onSuccess: () => {
            Alert.alert(
              `${bookingDetails?.name} has now been added to your favorites!`,
              "",
              [
                {
                  text: "Return to homepage",
                  onPress: () => {
                    navigation.replace("HOMEPAGE");
                  },
                },
                {
                  text: "Ok",
                },
              ]
            );
            refetch();
          },
        }
      );
    }
  };

  return (
    <>
      <Loading loading={isLoading || isBookingLoading} />
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 flex-1")}>
          <View style={tailwind("flex-1")}>
            <ProgressBar progress={100} className="mt-4" />
            <HeaderWithLogo
              back={false}
              title="Confirmation"
              subtitle={bookingDetails?.name}
              className="mt-6"
            />
            <View style={tailwind("mt-8 flex-1")}>
              <View
                style={tailwind(
                  "bg-primary-300 rounded-20 p-8 overflow-hidden flex-1"
                )}
              >
                <Typography color="white" variant="3xl" weight="medium">
                  Your booking has been confirmed!
                </Typography>
                <Typography color="white" weight="medium" className="mt-4">
                  I have added this booking to your calendar for you and anyone
                  invited has been notified.
                </Typography>
                <View style={tailwind("flex-row flex-1")}>
                  <View
                    style={[
                      tailwind(
                        clsx("flex-1 flex", {
                          // "mt-10": true
                        })
                      ),
                    ]}
                  >
                    <View
                      style={[
                        tailwind("flex-1  justify-center items-start"),
                        { rowGap: 20 },
                      ]}
                    >
                      <View style={[tailwind("flex-row"), { columnGap: 10 }]}>
                        <Icon
                          name="location"
                          fill="white"
                          stroke="none"
                          outline
                          width={20}
                          height={20}
                          style={{ marginTop: 4 }}
                        />
                        <Typography
                          color="white"
                          weight="medium"
                          variant="sm"
                          numberOfLines={2}
                        >
                          {bookingDetails?.location}
                        </Typography>
                      </View>
                      <View style={[tailwind("flex-row"), { columnGap: 10 }]}>
                        <Icon
                          name="calendar"
                          fill="white"
                          stroke="none"
                          width={20}
                          height={20}
                        />
                        <Typography color="white" weight="medium" variant="sm">
                          {bookingDetails?.date}
                        </Typography>
                      </View>
                      <View style={[tailwind("flex-row"), { columnGap: 10 }]}>
                        <Icon
                          name="time"
                          fill="white"
                          stroke="none"
                          width={20}
                          height={20}
                        />
                        <Typography color="white" weight="medium" variant="sm">
                          {bookingDetails?.time}
                        </Typography>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onNavigatePolicies}
                      >
                        <Typography
                          weight="medium"
                          variant="13"
                          color="white"
                          numberOfLines={2}
                        >
                          Review {bookingDetails?.name} policies
                        </Typography>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={tailwind("mt-2")}
                        onPress={() =>
                          navigation?.navigate("TERMS_AND_CONDITION")
                        }
                      >
                        <Typography weight="medium" variant="13" color="white">
                          Terms and conditions apply
                        </Typography>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={tailwind("flex-1")}>
                    <View
                      style={[
                        tailwind(
                          "w-[250px] h-[500px] absolute -left-4 overflow-hidden"
                        ),
                        { zIndex: 0 },
                      ]}
                    >
                      <Assistant
                        style={[
                          {
                            resizeMode: "contain",
                          },
                          tailwind("w-full flex-1"),
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[tailwind("flex-row"), { columnGap: 10 }]}>
            <View style={tailwind("flex-1")}>
              <Button
                onPress={() => {
                  Share.open({
                    url: "https://www.gooday.com.au",
                  });
                }}
                color="secondary"
                loading={false}
                disabled={false}
                className="mb-4 mt-8 bg-secondary-100"
                title="Share"
              />
            </View>
            <View style={tailwind("flex-1")}>
              <Button
                color="secondary"
                loading={isLoading}
                onPress={() => onFavoriteVenue(bookingDetails?.favorite)}
                className="mb-4 mt-8 bg-secondary-100"
                title="Favourite"
                right={{
                  name: 'heart',
                  width: 27,
                  height: 19,
                }}
                iconProps={{
                  fill: "white",
                  outline: !bookingDetails?.favorite
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
