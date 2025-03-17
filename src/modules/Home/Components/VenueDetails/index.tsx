import { Button, Icon, Typography } from "@app/ui";
import React, { FC, useMemo, useState } from "react";
import { Alert, Linking, Platform, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useTailwind } from "tailwind-rn";
import { OptionsSheet } from "@app/modules";
import { BusinessVenueDetailsEntity } from "@gooday_corp/gooday-api-client";

export const VenueDetails: FC<{ details: BusinessVenueDetailsEntity }> = ({
  details,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const tailwind = useTailwind();
  const latitude = details?.location?.coordinates?.[1] ?? 23.1083166673375;
  const longitude = details?.location?.coordinates?.[0] ?? 72.53529628671076;

  const metrics = useMemo(() => {
    const output = [details?.business?.name];
    if (details?.location?.distance) {
      output.push(`${details?.location?.distance}km away`);
    }
    return output
      .map((el) => el?.trim())
      .filter(Boolean)
      .join(", ");
  }, [details]);

  const openInNativeMaps = () => {
    const url = `maps:0,0?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable to open in native Maps app");
    });
  };

  const openInGoogleMaps = () => {
    const googleMapsUrl = `comgooglemaps://?center=${latitude},${longitude}&zoom=20&views=traffic&search=${details?.location?.meta?.formattedAddress}`;
    Linking.openURL(googleMapsUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(googleMapsUrl);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message || "Something went wrong!!");
      });
  };

  return (
    <View>
      <View style={tailwind("flex-row items-center justify-between")}>
        <Typography weight="medium" variant="xl">
          Details
        </Typography>
        {/* <View style={[tailwind("flex-row items-center"), { gap: 4 }]}>
          <Typography color="gray-500" weight="semibold">
            {`${details?.location?.distance}km`}
          </Typography>
          <Icon
            name="running"
            style={tailwind("h-5 w-5")}
            stroke="none"
            fill="#4D4D4D"
          />
        </View> */}
      </View>
      {/* <Typography color="gray-500" className="mt-2">
        {details?.location?.meta?.shortFormattedAddress || "-"}
      </Typography> */}
      <View style={tailwind("rounded-20 overflow-hidden w-full mt-6 mb-4 h-34")}>
        <MapView
          mapType={Platform.OS === "android" ? "standard" : "mutedStandard"}
          userInterfaceStyle="light"
          onPress={(item) => setShowOptions(true)}
          style={{ flex: 1 }}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            title={details.business?.name}
            image={require("../../../../assets/Images/location.png")}
            coordinate={{ latitude, longitude }}
            style={{ height: 16, width: 16 }}
          />
        </MapView>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowOptions(true)}
      >
        <Typography color='primary-300' variant='base' weight='medium'>Review transportation options</Typography>
      </TouchableOpacity>

      {showOptions && (
        <OptionsSheet
          visible={showOptions}
          hide={() => setShowOptions(false)}
          buttons={[
            {
              title: "Open in Maps",
              onPress: openInNativeMaps,
            },
            {
              title: "Open in Google Maps",
              onPress: openInGoogleMaps,
            },
          ]}
        />
      )}
    </View>
  );
};
