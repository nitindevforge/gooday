import React, { FC, useEffect, useMemo } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  HomeNavigationParamList,
  ListComponents,
  SectionListCard,
  useGetBusinessVenue,
  useGetBusinessVenueFriends,
  useVenueFilter,
  useWhatsOnFavoriteList,
  VenueDetailsCard,
  VenueEmpty,
  WhatsOnCard,
} from "@app/modules";
import {
  check,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import { AxiosResponse } from "axios";
import { BusinessFavoriteListResponseDTO, BusinessVenueResponseDTO, WhatsOnFavoriteListResponseDTO } from "@gooday_corp/gooday-api-client";
import { VenueSectionListProps } from "./type";
import { Loading } from "@app/ui";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
export const VenueSectionList: FC<VenueSectionListProps> = ({
  type,
  active,
  onView,
  back,
  businessType
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { filter } = useVenueFilter();
  const { updateBooking } = useUserBooking();
  const { data: friendVenues, isLoading: isVenueLoading } = useGetBusinessVenueFriends({
    available_today: filter?.available_today,
    distance: String(filter?.distance),
    price: filter?.price,
  });
  const { data: whatsOn, isLoading: isWhatsOnLoading, error } = useWhatsOnFavoriteList();

  const whatsOnList = useMemo(() => {
    const whatsOnList = whatsOn?.pages?.reduce(
      (
        acc: WhatsOnFavoriteListResponseDTO["data"],
        page: AxiosResponse<WhatsOnFavoriteListResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return whatsOnList ?? [];
  }, [whatsOn]);

  const friendVenuesList = useMemo(() => {
    const friendVenuesList = friendVenues?.pages?.reduce(
      (
        acc: BusinessFavoriteListResponseDTO["data"],
        page: AxiosResponse<BusinessFavoriteListResponseDTO>
      ) => {
        return [...(acc ?? []), ...(page?.data?.data ?? [])];
      },
      []
    );
    return friendVenuesList ?? [];
  }, [friendVenues]);

  const { data: venuesData, isLoading } = useGetBusinessVenue(
    {
      category: type,
      price: filter?.price,
      available_today: filter?.available_today,
      distance: String(filter?.distance),
      type: businessType
    },
    active
  );

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
        const permission = await check(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          } as any)
        );

        if (RESULTS?.GRANTED !== permission) {
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
  }, []);

  return (
    <View style={tailwind("flex-1")}>
      <Loading loading={isLoading || isVenueLoading || isWhatsOnLoading} />
      {
        !isLoading && !isVenueLoading && !isWhatsOnLoading &&
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={tailwind('flex-1')}>
            {
              !!venues?.length &&
              <SectionListCard
                data={venues}
                onPress={onView!}
                onView={() => { }}
                isLoading={isLoading}
                title="Close to you"
                buttonTitle="View More"
                SectionCard={VenueDetailsCard}
              />
            }
            {
              !!whatsOnList?.length &&
              <View style={tailwind('mt-4')}>
                <ListComponents
                  title="What’s On"
                  data={whatsOnList}
                  width={175}
                  height={135}
                  hideArrow
                  renderItem={({ item }) => (
                    <WhatsOnCard
                      item={item}
                      onNavigateCb={() => {
                        updateBooking({
                          venueObj: {
                            ...item?.venue,
                            business: item.business,
                          },
                          venue: item?.venue?._id,
                          business: item.business?._id,
                        });
                        navigation?.navigate("EVENT_DETAILS", { data: item });
                      }}
                    />
                  )}
                />
              </View>
            }

            {
              !!friendVenuesList?.length &&
              <SectionListCard
                data={friendVenuesList ?? []}
                onPress={() => navigation.navigate('FRIENDS_FAVORITE_VENUES', { back: back })}
                // onView={() => navigation.navigate('FRIENDS_FAVORITE_VENUES')}
                isLoading={isLoading}
                title="Friend’s Favourites"
                buttonTitle="View More"
                SectionCard={VenueDetailsCard}
              />
            }

          </View>
          {
            !friendVenuesList?.length && !whatsOnList?.length && !venues?.length &&
            <View style={tailwind('flex-1 mt-4')}>
              <VenueEmpty />
            </View>
          }
        </ScrollView>
      }
    </View>
  );
};
