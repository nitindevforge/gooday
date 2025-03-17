import { Icon, Typography } from "@app/ui";
import React, { FC } from "react";
import {
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { FriendCardProps } from "./type";
import clsx from "clsx";
import { shadowStyles } from "@app/modules";
import { getAssetUrl } from "@app/utils";
import { Assistant } from "@app/components";

export const FriendUserCard: FC<FriendCardProps> = ({
  friend,
  onPress,
  active,
  disabled = false,
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
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
            uri: getAssetUrl(friend?.profile),
          }}
          defaultSource={require("../../../../assets/Images/profile.png")}
        />
        <Assistant
          id={friend.assistant?._id}
          style={{
            position: "absolute",
            bottom: -90,
            left: 80,
            width: 100,
            height: 200,
            zIndex: 0,
          }}
          resizeMode="contain"
        />
        <Typography
          weight="medium"
          variant="2xl"
          color="white"
          numberOfLines={2}
          className="text-center z-40"
        >
          {friend?.firstName || friend?.nickName}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};
