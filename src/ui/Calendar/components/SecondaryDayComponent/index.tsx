import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import moment from "moment";
import clsx from "clsx";
import { Typography } from "@app/ui";
import { SecondaryDayComponentProps } from "./type";

export const SecondaryDayComponent: React.FC<SecondaryDayComponentProps> = ({
  onPress,
  isDisabled,
  item,
  isSelected,
  hasSlotsToday,
  slots
}) => {
  const tailwind = useTailwind();
  const disabled = isDisabled || typeof onPress !== "function";
  const isToday = moment(item).isSame(moment(), "day");
  const slotsLength = slots?.filter((element) => element?.isAvailable === true)?.length || 0;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
      disabled={disabled}
      style={[tailwind(clsx("w-12 h-10 my-2 items-center justify-center"))]}
    >
      <View
        style={[
          tailwind(
            clsx({
              "bg-primary-300 rounded-full w-9 h-9 items-center justify-center":
                isSelected,
            })
          ),
          { gap: 2 },
        ]}
      >
        {item ? (
          <Typography
            variant="11"
            weight={isToday ? "bold" : "regular"}
            color={isSelected ? "white" : disabled ? "gray-500" : "black"}
          >
            {moment(item).format("D")}
          </Typography>
        ) : null}

        {item !== null && hasSlotsToday && !disabled && (
          <View
            style={tailwind(
              clsx("rounded-full mx-auto w-2 h-2", {
                "bg-primary-300": item !== null && hasSlotsToday || slotsLength > 4,
                "bg-warning": slotsLength < 4,
                "bg-error": slotsLength < 2,
                "bg-white": isSelected,
              })
            )}
          />
        )}
      </View>
      {isToday && !isSelected && !hasSlotsToday && (
        <Image
          style={{ width: 30, position: "absolute", bottom: 5 }}
          source={require("../../../../assets/Images/stroke-line.png")}
        />
      )}
    </TouchableOpacity>
  );
};
