import { Typography } from "@app/ui";
import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TimeChipProps } from "./type";
import clsx from "clsx";
import { getFormattedDate } from "@app/utils";

export const TimeChip: FC<TimeChipProps> = ({
  date,
  slide,
  style,
  onPress = () => { },
  hasConflict = false,
  disable = false
}) => {
  const tailwind = useTailwind();
  const activeDate = date === slide?.start;
  const notActiveDate = date !== slide?.start;

  const getColor = () => {
    if (disable || !hasConflict && !slide?.isAvailable && activeDate) {
      return "gray-500"
    } else if (activeDate) {
      return "white"
    } else if (slide?.isAvailable && !hasConflict) {
      return "primary-300"
    } else if (hasConflict && !slide?.isAvailable || hasConflict && notActiveDate) {
      return "secondary-400"
    } else {
      return "gray-500"
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(slide)}
      style={[
        { borderRadius: 10 },
        tailwind(
          clsx("h-8 border-primary-300 border items-center justify-center", {
            "bg-primary-300": activeDate,
            "bg-gray-700 border-0": !hasConflict && !slide?.isAvailable,
            "bg-secondary-400 border-0": hasConflict && activeDate && !slide?.isAvailable,
            "bg-transparent border-secondary-400 border": hasConflict && notActiveDate,
            "bg-gray-700 border-0 ": !!disable,
          })
        ),
        style,
      ]}
    >
      <Typography
        weight="medium"
        variant="sm"
        color={getColor()}
      >
        {getFormattedDate("LT", slide?.start)}
      </Typography>
    </TouchableOpacity>
  );
};
