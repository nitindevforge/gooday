import React, { FC } from "react";
import { Dimensions, Image, Platform, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Typography } from "@app/ui";
import { HomeNavigationParamList, shadowStyles } from '@app/modules';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StaffDetailsCardProps } from "./type";
import clsx from "clsx";
import { getAssetUrl } from "@app/utils";


export const StaffDetailsCard: FC<StaffDetailsCardProps> = ({
  staff,
  onPress,
  disabled,
  active,
  staffPrice,
  individualPricingPerStaff = false
}) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        active && shadowStyles?.dropShadow,
        {
          elevation: active ? 10 : 0,
          height: Platform.select({
            ios: 215,
            android: 200,
          }),
        },
        tailwind("rounded-full flex items-center justify-center"),
      ]}
    >
      <View
        style={[
          tailwind(
            clsx(
              "rounded-20 bg-primary-100 items-center justify-center overflow-hidden relative px-2",
              {
                "opacity-75": !active,
              }
            )
          ),
          {
            height: 190,
            width: Dimensions.get("screen").width / 2 - 34,
            justifyContent: 'flex-end',
            paddingBottom: 18
          },
        ]}
      >
        <Image
          style={[
            {
              width: 89,
              height: 89,
              borderWidth: 1.5,
              borderColor: "white",
              position: "absolute",
              top: 25,
              left: 40,
            },
            tailwind("rounded-full"),
          ]}
          source={{
            uri: getAssetUrl(staff?.profilePicture),
          }}
          defaultSource={require("../../../../assets/Images/profile.png")}
        />
        <Typography
          weight="medium"
          variant="2xl"
          color="white"
          numberOfLines={2}
          className="text-center z-40"
        >
          {staff?.firstName || staff?.lastName}
        </Typography>
        {
          individualPricingPerStaff &&
          <Typography
            weight="medium"
            variant="base"
            color="white"
            numberOfLines={2}
            className="text-center z-40"
          >
            A${staffPrice || 0}
          </Typography>
        }
      </View>
    </TouchableOpacity>
  );
};
