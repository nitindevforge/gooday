import {
  Button,
  Carousel,
  Icon,
  Loading,
  ProgressBar,
  Typography,
} from "@app/ui";
import React, { Fragment, useMemo } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  EventDetailsCard,
  SectionListCard,
  HeaderWithLogo,
  ServiceDetailsCard,
  VenueDetails,
  useVenueFavoriteMutation,
  useVenueUnfavoriteMutation,
  useGetPrepaidService,
  HomeNavigationParamList,
  useGetBusinessVenueFriendCount,
  useGetBusinessVenueFavorite,
  useGetWhatsOn,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { getAssetUrl } from "@app/utils";
import { useUserBooking } from "@app/common";
import {
  PrepaidServiceResponseDTO,
  WhatsOnResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { AxiosResponse } from "axios";
import {
  Link,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import clsx from "clsx";

export const VenueDetailsContainer = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "VENUE_DETAILS">>();
  const { booking } = useUserBooking();
  const { data: likes, refetch: onRefetch } = useGetBusinessVenueFriendCount(
    booking?.venueObj?._id
  );
  const { data: favorite, refetch } = useGetBusinessVenueFavorite(
    booking?.venueObj?._id
  );
  const { mutate, isLoading } = useVenueFavoriteMutation();
  const { data, isLoading: isPrepaidServiceLoading } = useGetPrepaidService({
    venue: booking?.venueObj?._id,
    category: "",
  });

  const { data: whatsOn, isLoading: isWhatsOnLoading } = useGetWhatsOn({
    venue: booking?.venueObj?._id,
    search: "",
  });

  const { mutate: unfavorite, isLoading: isUnfavoriteLoading } =
    useVenueUnfavoriteMutation();
  const onFavoriteVenue = () => {
    if (booking?.venue) {
      if (favorite?.data?.data?._id) {
        unfavorite(
          { venue: booking?.venue },
          {
            onSuccess: () => {
              refetch();
              onRefetch();
            },
          }
        );
        return;
      }
      mutate(
        { venue: booking?.venue },
        {
          onSuccess: () => {
            refetch();
            onRefetch();
          },
        }
      );
    }
  };
  const prepaidService = useMemo(() => {
    const services = data?.pages?.reduce(
      (
        acc: PrepaidServiceResponseDTO["data"],
        page: AxiosResponse<PrepaidServiceResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return services ?? [];
  }, [data]);

  const whatsOnList = useMemo(() => {
    const whatsOnRecord = whatsOn?.pages?.reduce(
      (
        acc: WhatsOnResponseDTO["data"],
        page: AxiosResponse<WhatsOnResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return whatsOnRecord ?? [];
  }, [whatsOn]);

  const onMakeBooking = () => {
    navigation.navigate("BOOKING_METHOD");
  };
  const title = useMemo(() => {
    return `Find a ${booking?.venueObj?.business?.businessCategory?.name?.toLocaleLowerCase()}`;
  }, [booking?.business]);


  return (
    <View style={[tailwind("flex-1"), { marginTop: useSafeAreaInsets().top }]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Loading
        loading={
          isUnfavoriteLoading ||
          isLoading ||
          isPrepaidServiceLoading ||
          isWhatsOnLoading
        }
      />
      <View style={tailwind("flex-1")}>
        <View style={tailwind("px-6")}>
          <ProgressBar progress={35} className="mt-4" />
          <HeaderWithLogo
            title={
              params?.home
                ? "Back"
                : (title || booking?.venueObj?.business?.name) ?? ""
            }
            className="mt-2"
            hideLogo
          />
        </View>
        <ScrollView
          style={tailwind("flex-1")}
          contentContainerStyle={{ paddingBottom: 55 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={tailwind("flex-1 pb-5")}>
            <Carousel
              slides={booking?.venueObj?.coverPhoto}
              style={tailwind("flex-1")}
              pagination
              parRow={1}
              paginationAbsolute
              slideComponent={({ slide }) => {
                return (
                  <Image
                    source={{ uri: getAssetUrl(slide) }}
                    resizeMode={!!slide ? "cover" : "contain"}
                    style={{
                      width: Dimensions.get("window").width,
                      height: 213,
                    }}
                    defaultSource={require("../../../../assets/Images/logo-primary.png")}
                  />
                );
              }}
            />

            <View style={tailwind("px-6 mb-4 flex-1")}>
              <View style={[{ gap: 6, flex: 1 }]}>
                <View style={tailwind("flex-row justify-between mt-5")}>
                  <Typography weight="medium" variant="2xl">
                    {booking?.venueObj?.business?.name}
                  </Typography>
                  <TouchableOpacity activeOpacity={1} onPress={onFavoriteVenue}>
                    <Icon
                      name="heart"
                      outline={!favorite?.data?.data?._id}
                      fill="#E24653"
                      width={28}
                      height={28}
                    />
                  </TouchableOpacity>
                </View>
                {(booking?.venueObj?.location?.meta?.shortFormattedAddress ||
                  booking?.venueObj?.location?.meta?.formattedAddress) && (
                    <View style={[tailwind("flex-row items-center"), { gap: 4 }]}>
                      <Icon
                        name="location"
                        fill="#3A5ACA"
                        width={18}
                        outline={false}
                        height={18}
                      />
                      <Typography
                        numberOfLines={1}
                        weight="regular"
                        variant="base"
                      >
                        {booking?.venueObj?.location?.meta
                          ?.shortFormattedAddress ||
                          booking?.venueObj?.location?.meta?.formattedAddress}
                      </Typography>
                    </View>
                  )}

                <View style={[tailwind("flex-row mt-2"), { gap: 6 }]}>
                  {booking?.venueObj?.website && (
                    <Button
                      variant="outline"
                      iconPosition="left"
                      icon="website"
                      title="Website"
                      onPress={() =>
                        Linking.openURL(booking?.venueObj?.website)
                      }
                      iconProps={{
                        name: "website",
                        fill: "#3A5ACA",
                      }}
                      radius="rounded-full"
                      className="h-10 px-4 flex-1"
                    />
                  )}
                  {booking?.venueObj?.phone && (
                    <Button
                      variant="outline"
                      iconPosition="left"
                      icon="call"
                      onPress={() =>
                        Linking.openURL(`tel:$${booking?.venueObj?.phone}`)
                      }
                      title="Call"
                      iconProps={{
                        name: "call",
                        fill: "#3A5ACA",
                      }}
                      radius="rounded-full"
                      className="h-10 px-4 flex-1"
                    />
                  )}
                </View>

                <View
                  style={[
                    tailwind(
                      clsx("flex-row items-center", {
                        "mt-1":
                          !!booking?.venueObj?.website ||
                          !!booking?.venueObj?.phone,
                        // ||
                        // !!booking?.venueObj?.email,
                      })
                    ),
                    { gap: 12 },
                  ]}
                >
                  <View
                    style={[tailwind("flex-row items-center"), { gap: 10 }]}
                  >
                    <Icon name="heart" fill="#8B8B8B" width={14} height={14} />
                    <Typography color="gray-400" weight="medium" variant="sm">
                      {likes?.data?.data?.venueFavorite || 0}
                    </Typography>
                  </View>
                  <View style={[tailwind("flex-row items-center"), { gap: 8 }]}>
                    <Icon
                      name="profile-policy"
                      fill="#8B8B8B"
                      width={14}
                      height={14}
                    />
                    <Typography color="gray-400" weight="medium" variant="sm">
                      {likes?.data?.data?.venueFavoriteByFriend || 0} Friends
                      favourited
                    </Typography>
                  </View>
                </View>
                {!!booking?.venueObj?.description && (
                  <Typography
                    color="gray-200"
                    className="mt-1"
                    weight="regular"
                    variant="sm"
                  >
                    {booking?.venueObj?.description}
                  </Typography>
                )}

                <View
                  style={[
                    tailwind("flex-row items-center justify-start flex-1"),
                    {},
                  ]}
                >
                  <Typography color="primary-300" weight="regular" variant="sm">
                    {booking?.venueObj?.priceRange}
                  </Typography>
                  {booking?.venueObj?.tags?.length > 0 && (
                    <View
                      style={[
                        tailwind("bg-primary-300 mx-2"),
                        [{ width: 1, height: "80%" }],
                      ]}
                    />
                  )}
                  {!!booking?.venueObj?.tags?.length && (
                    <Typography
                      className="flex-1"
                      color="primary-300"
                      weight="regular"
                      variant="sm"
                    >
                      {booking?.venueObj?.tags
                        ?.map((text) => text?.name)
                        ?.join(" • ")}
                    </Typography>
                  )}
                </View>
              </View>
            </View>
            <SectionListCard
              data={whatsOnList}
              title="What’s On"
              buttonTitle="View All"
              isLoading={false}
              onPress={() => navigation.navigate("WHATS_ON")}
              SectionCard={EventDetailsCard}
            />

            <SectionListCard
              data={prepaidService}
              title="Services"
              buttonTitle="View All"
              isLoading={false}
              onPress={() => {
                navigation.navigate("ADD_ON", { type: "SERVICE" });
              }}
              SectionCard={ServiceDetailsCard}
            />
            <View style={tailwind("px-6 mt-4 mb-4")}>
              <VenueDetails details={booking?.venueObj} />
            </View>
            {!!booking?.venueObj?.socialMedia?.images?.[0] && (
              <View>
                <View style={[tailwind("flex-row px-4 mb-4"), { gap: 12 }]}>
                  <Typography variant="base" weight="medium">
                    Follow Us
                  </Typography>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      Linking.openURL(booking?.venueObj?.socialMedia.link!)
                    }
                  >
                    <Typography
                      color="primary-300"
                      variant="base"
                      weight="medium"
                    >
                      View Social
                    </Typography>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{
                    uri: getAssetUrl(
                      booking?.venueObj?.socialMedia?.images?.[0]
                    ),
                  }}
                  resizeMode="cover"
                  style={{ width: "auto", height: 448 }}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <View style={tailwind("px-6 absolute bottom-4 w-full")}>
          <Button
            loading={false}
            onPress={onMakeBooking}
            color="secondary"
            size="medium"
            title="Make a booking"
          />
        </View>
      </View>
    </View>
  );
};
