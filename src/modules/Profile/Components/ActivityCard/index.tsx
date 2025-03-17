import React from "react";
import { ImageBackground, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ActivityCardProps } from "./type";
import { Typography } from "@app/ui";

export const UserActivityCard: React.FC<ActivityCardProps> = ({
  number,
  title,
  image,
}) => {
  const tailwind = useTailwind();

  return (
    <ImageBackground
      imageStyle={{ borderRadius: 12 }}
      resizeMode="cover"
      source={image}
    >
      <View
        style={[tailwind("items-start pt-14 px-6"), { height: 180 }]}
      >
        <Typography variant="5xl" weight="semibold" color="white">
          {number}
        </Typography>
        <Typography color="white" weight="semibold" variant="base">
          {title}
        </Typography>
      </View>
    </ImageBackground>
  );
};
