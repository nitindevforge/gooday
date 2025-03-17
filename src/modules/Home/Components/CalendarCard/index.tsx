import React, { FC } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";
import { CalendarCardProps, VenueDetailsCardProps } from "./type";
import { getAssetUrl } from "@app/utils";
import { useUserBooking } from "@app/common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeNavigationParamList } from "../../Navigation";
import { shadowStyles } from "@app/modules";

export const CalendarCard: FC<CalendarCardProps> = ({
  item,
  onNavigateCb = () => {},
  style,
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const onNavigate = () => {
    navigation?.navigate("VENUE_DETAILS", { id: item?._id! });
    onNavigateCb();
  };

  return (
    <TouchableOpacity
      onPress={onNavigate}
      activeOpacity={0.7}
      style={shadowStyles.boxShadow}
    >
      <ImageBackground
        source={
          item?.coverPhoto?.length
            ? { uri: getAssetUrl(item?.coverPhoto?.[0]) }
            : require("@app/assets/Images/logo-primary.png")
        }
        style={[
          tailwind(
            "rounded-xl overflow-hidden border-white bg-transparent justify-end"
          ),
          {
            height: "100%",
            maxHeight: 181,
            width: width,
          },
          style,
        ]}
        resizeMode="cover"
      >
        <View
          style={[
            tailwind(
              "rounded-t-xl items-start justify-between bg-white px-4 py-2"
            ),
            {
              gap: 4,
              maxHeight: 110,
            },
          ]}
        >
          <Typography
            numberOfLines={1}
            className=""
            variant="base"
            weight="semibold"
          >
            {item?.business?.name}
          </Typography>
          <Typography
            color="gray-300"
            variant="sm"
            weight="medium"
            numberOfLines={1}
          >
            {item?.business?.businessCategory?.["name"]}
          </Typography>
          <View style={tailwind("flex-row w-full justify-between")}>
            <Typography color="gray-300" variant="sm" weight="medium">
              {item?.priceRange}
            </Typography>
            {item?.location?.distance && (
              <View style={[tailwind("flex-row items-center"), { gap: 2 }]}>
                <Icon
                  name="location-mark"
                  stroke="none"
                  width={8}
                  height={8}
                  fill="#4D4D4D"
                />
                <Typography color="gray-300" variant="sm" weight="medium">
                  {Number(Number(item?.location?.distance) / 1000).toFixed(2)}
                  km
                </Typography>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
