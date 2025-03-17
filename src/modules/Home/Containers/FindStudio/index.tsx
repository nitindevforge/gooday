import { Button, Loading, ProgressBar, Typography } from "@app/ui";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import {
  BottomSearch,
  HeaderWithLogo,
  HomeNavigationParamList,
  useGetBusinessVenue,
  useGetUser,
  VenueDetails,
  VenueDetailsCard,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BusinessVenueResponseDTO } from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
import {
  check,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

export const FindStudioContainer = () => {
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "FIND_VENUE">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const tailwind = useTailwind();
  const { data, isLoading: isUserLoading } = useGetUser();
  const { updateBooking } = useUserBooking();
  const { data: venuesData, isLoading } = useGetBusinessVenue(
    {
      category: params?.categoryId,
    },
    !!params?.categoryId &&
    !isUserLoading &&
    !!data?.data?.data?.location?.length
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleCardPress = (id: string, index: number) => {
    setActiveIndex(index);
  };

  const venues = useMemo(() => {
    const venues = venuesData?.pages?.reduce(
      (
        acc: BusinessVenueResponseDTO["data"],
        page: AxiosResponse<BusinessVenueResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return venues ?? [];
  }, [venuesData]);

  useEffect(() => {
    if (!venues?.length) {
      (async () => {
        const location = await check(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          } as any)
        );
        if (RESULTS?.GRANTED !== location) {
          Alert.alert(
            "Location Permission Required",
            "This feature requires access to your location. Please enable location permissions in settings.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => openSettings(),
              },
            ]
          );
        }
      })();
    }
  }, [venues]);

  const message = useMemo(() => {
    let text = 'Sorry, we couldn’t find any venues matching your search'
    if (params?.categoryId === 'favorite') {
      text = 'Start searching businesses in different categories to see and save them in your favourites!'
    }
    return text;
  }, [params?.categoryId])

  return (
    <>
      <Loading loading={isLoading} />
      <StatusBar backgroundColor="white" barStyle='dark-content' />

      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 flex-1")}>
          <ProgressBar progress={20} className="mt-4" />
          <HeaderWithLogo
            title={`Find a ${params?.title}`}
            subtitle={
              params?.categoryId === "favorite" ? "" : "Within 5km of you"
            }
            className="mt-6"
          />
          {!!venues?.length ? (
            <ScrollView
              style={tailwind("flex-1")}
              showsVerticalScrollIndicator={false}
            >
              <View style={tailwind("mt-7 bg-gray-600 rounded-20")}>
                {venues?.map((el, index) => {
                  return (
                    <VenueDetailsCard
                      key={el?._id}
                      item={el}
                      index={index}
                      onPress={handleCardPress}
                      activeIndex={activeIndex}
                      isActive={index === activeIndex}
                    />
                  );
                })}
              </View>
              <View style={tailwind("mt-7 mb-4")}>
                <VenueDetails details={venues?.[activeIndex]} />
              </View>
            </ScrollView>
          ) : isLoading ? null : (
            <View style={tailwind("items-center justify-center flex-1")}>
              <Typography weight="medium" variant="lg" className="text-center">
                {message}
              </Typography>
            </View>
          )}
        </View>
        <View style={tailwind("px-6")}>
          <Button
            loading={false}
            disabled={!venues?.length ? true : false}
            onPress={() => {
              const venue = venues?.[activeIndex];
              updateBooking({
                venueObj: venues?.[activeIndex],
                venue: venue?._id,
                business: venue.business?._id,
              });
              navigation?.navigate("INVITE_FRIENDS");
            }}
            className="mb-4 mt-8"
            title="Next"
          />
        </View>
      </SafeAreaView>
      <BottomSearch />
    </>
  );
};
