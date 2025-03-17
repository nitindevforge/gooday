import { Icon, Typography } from "@app/ui";
import React from "react";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ActivityCardProps } from "./type";
import clsx from "clsx";
import { shadowStyles } from "@app/modules";
import { Assistant } from "@app/components";

const ActivityCard: React.FC<ActivityCardProps> = ({
  index,
  slide,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("flex-1 mx-6 mb-5"),
        shadowStyles?.dropShadow,
        {
          elevation: 12,
        },
        index !== 0 ? tailwind("-ml-1.5") : {},
      ]}
    >
      <TouchableOpacity
        onPress={slide?.onPress}
        activeOpacity={0.8}
        style={[
          tailwind(
            clsx("rounded-2xl p-4 overflow-hidden flex-1", {
              "bg-primary-100": index === 0 || index === 2,
              "bg-secondary-100": index === 1 || index === 3,
              // "mr-6": index === numberOfSlide - 1,
              // "ml-6": index === 0,
            })
          ),
          { width: 285 },
        ]}
      >
        <Icon name={slide.icon} fill="#fff" stroke="none" />
        <Typography className="my-3" weight="medium" variant="xl" color="white">
          {slide.title}
        </Typography>
        <Typography color="white" variant="15" weight="medium" className="leading-5">
          {slide.desc}
        </Typography>
        <View
          style={tailwind(
            clsx("w-[200px] h-[200px] absolute right-0 top-36", {
              "right-1 w-[150px] h-[150px] top-40": index > 0,
            })
          )}
        >
          <Image
            source={slide.image}
            style={[
              {
                resizeMode: "contain",
              },
              tailwind("w-full flex-1 mt-2"),
            ]}
          />
        </View>
        <Assistant
          style={[
            {
              resizeMode: "contain",
            },
            tailwind("mt-2 h-[450px] w-56 -left-16"),
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ActivityCard;
