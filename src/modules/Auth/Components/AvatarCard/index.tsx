import { Typography } from "@app/ui";
import React from "react";
import { Dimensions, Platform, View } from "react-native";
import { AvatarCardProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { Assistant } from "@app/components";

const AvatarCard: React.FC<AvatarCardProps> = ({
  active,
  index,
  slide,
  numberOfSlide,
}) => {
  const tailwind = useTailwind();
  const { width } = Dimensions.get("window");

  return (
    <View
      style={[
        {
          opacity: active !== index ? 0.3 : 1,
          marginLeft: index === 0 ? Platform.select({
            ios: 108,
            android: 95
          }) : 0,
          marginRight: index === numberOfSlide - 1 ? Platform.select({
            ios: 108,
            android: 95
          }) : 0,
          width: width / 3,
        },
      ]}
    >
      <View style={tailwind("flex-1")}>
        <Typography weight="bold" variant="2xl" className="text-center">
          {active === index ? slide.name : " "}
        </Typography>
        <Assistant
          key={index}
          id={slide?.id}
          style={[
            {
              resizeMode: "contain",
            },
            tailwind("w-full flex-1 mt-2"),
          ]}
        />
      </View>
    </View>
  );
};

export default AvatarCard;
