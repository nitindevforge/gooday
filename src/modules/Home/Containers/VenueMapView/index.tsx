import React, { FC, useMemo } from "react";
import { Platform, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useGetBusinessVenue, useGetUser, useVenueFilter, VenueDetailsCard } from "@app/modules";
import { AxiosResponse } from "axios";
import {
  BusinessVenueDetailsEntity,
  BusinessVenueResponseDTO,
} from "@gooday_corp/gooday-api-client";
import { VenueMapViewProps } from "./type";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { CommonBottomSheet, Loading } from "@app/ui";
import NiceModal from "@ebay/nice-modal-react";

export const VenueMapView: FC<VenueMapViewProps> = ({ type, active, businessType }) => {
  const tailwind = useTailwind();
  const { data } = useGetUser();
  const { filter } = useVenueFilter();
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

  const onMarkerPress = (venue: BusinessVenueDetailsEntity) => {
    NiceModal.show(CommonBottomSheet, {
      children: (
        <View
          style={[
            tailwind("bg-white w-full p-4 pb-8 rounded-xl"),
            { height: 200 },
          ]}
        >
          <VenueDetailsCard
            onNavigateCb={() => NiceModal.hide(CommonBottomSheet)}
            width={"100%"}
            item={venue}
          />
        </View>
      ),
      style: { margin: 0 },
    });
  };

  return (
    <View style={tailwind("overflow-hidden w-full mt-6 flex-1")}>
      <Loading loading={isLoading} />
      <MapView
        initialRegion={{
          latitude: data?.data?.data?.location?.[1] ?? 23.1083166673375,
          longitude: data?.data?.data?.location?.[0] ?? 72.53529628671076,
          latitudeDelta: 8.5,
          longitudeDelta: 8.5,
        }}
        mapType={Platform.OS === "android" ? "standard" : "mutedStandard"}
        userInterfaceStyle="light"
        showsUserLocation
        showsMyLocationButton
        style={{ flex: 1 }}
        clusterColor="#e46c74"
      >
        {venues?.map((el) => (
          <Marker
            onPress={() => onMarkerPress(el)}
            key={el._id}
            title={
              el.location?.meta?.shortFormattedAddress ||
              el.location?.meta?.formattedAddress
            }
            image={require("../../../../assets/Images/locationIcon.png")}
            coordinate={{
              latitude: el.location?.coordinates?.[1],
              longitude: el.location?.coordinates?.[0],
            }}
            style={{ height: 16, width: 16 }}
          />
        ))}
      </MapView>
    </View>
  );
};
