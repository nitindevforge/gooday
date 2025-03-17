import React from "react";
import { View } from "react-native";
import { AvatarDetailsCardProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { ProgressBar, Typography } from "@app/ui";
import clsx from "clsx";

const AvatarDetailsCard: React.FC<AvatarDetailsCardProps> = ({
  className,
  details,
}) => {
  const tailwind = useTailwind();
  const attributes = [
    {
      title: "Likes",
      values: details?.likes || [],
    },
    {
      title: "Dislikes",
      values: details?.dislikes || [],
    },
  ];

  const gridData = details?.skills?.slice(0, 2)?.map((skill, index) => ({
    left: skill,
    right: attributes[index],
  })) ?? [];

  return (
    <View
      style={tailwind(clsx("w-full bg-gray-700 rounded-10 px-6 py-4", className))}
    >
      <View style={[tailwind("items-center"), { gap: 4 }]}>
        {gridData.map(({ left, right }, index) => (
          <View style={[tailwind("flex-row"), { columnGap: 32 }]}>
            {!!left && (
              <View
                key={left?.title}
                style={tailwind(
                  clsx(
                    {
                      "mt-2": index > 0,
                    },
                    "flex-1"
                  )
                )}
              >
                <Typography weight="semibold" variant="sm">
                  {left?.title}
                </Typography>
                <View style={tailwind("mt-2")}>
                  <ProgressBar
                    unfilledColor="#C6C6C6"
                    color="#3A5ACA"
                    progress={left?.weightage * 100}
                    height={7}
                  />
                </View>
              </View>
            )}
            {!!right && (
              <View
                key={right?.title}
                style={tailwind(
                  clsx(
                    {
                      "mt-2": index > 0,
                    },
                    "flex-1 h-15"
                  )
                )}
              >
                <Typography weight="semibold" variant="sm">
                  {right.title}:
                </Typography>
                <Typography
                  weight="semibold"
                  numberOfLines={2}
                  variant="xs"
                  color="gray-300"
                >
                  {right.values.join(", ")}
                </Typography>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default AvatarDetailsCard;
