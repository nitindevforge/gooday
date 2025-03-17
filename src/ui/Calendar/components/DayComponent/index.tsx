import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import moment from "moment";
import clsx from "clsx";
import { Typography } from "@app/ui";
import { DayComponentProps } from "./type";

export const DayComponent: React.FC<DayComponentProps> = ({
  onPress,
  item,
  isDisabled,
}) => {
  const tailwind = useTailwind();
  const disabled = isDisabled || typeof onPress !== "function";
  const isToday = moment(item).isSame(moment(), "day");

  const children = (
    <View
      style={tailwind(clsx("rounded-full w-9 h-9 items-center justify-center"))}
    >
      <Typography
        variant="sm"
        weight={isToday ? "bold" : "regular"}
        color={isDisabled ? "gray-500" : "black"}
      >
        {moment(item).format("D")}
      </Typography>
    </View>
  );

  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        tailwind(clsx("h-10 mt-1 items-center justify-center flex-1 w-12")),
      ]}
    >
      {children}
      {isToday && (
        <Image
          style={{ width: 30, position: "absolute", bottom: 5 }}
          source={require("../../../../assets/Images/stroke-line.png")}
        />
      )}
    </TouchableOpacity>
  );
};
