import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import moment from "moment";
import clsx from "clsx";
import { Typography } from "@app/ui";
import { WeekDaySlotsProps } from "./type";

export const WeekDaySlot: React.FC<WeekDaySlotsProps> = ({
  isDisabled,
  item,
  isSelected,
  onPress,
  slots,
}) => {
  const tailwind = useTailwind();
  const disabled = isDisabled || typeof onPress !== "function";
  const slotsLength = slots?.filter((element) => element?.isAvailable === true)?.length || 0;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        tailwind(
          clsx(
            "items-center justify-center rounded-xl border-gray-600 border-2",
            {
              "border-primary-300 bg-primary-300/5": isSelected,
              "bg-gray-700": disabled,
            }
          )
        ),
        { width: 60, height: 93, gap: 6 },
      ]}
    >
      {item ? (
        <Typography
          variant="11"
          weight={"regular"}
          color={
            isSelected ? "primary-300" : disabled ? "gray-500" : "gray-200"
          }
        >
          {moment(item).format("ddd")}
        </Typography>
      ) : null}

      {item ? (
        <Typography
          variant="base"
          weight={"semibold"}
          color={disabled ? "gray-500" : "primary-300"}
        >
          {moment(item).format("D")}
        </Typography>
      ) : null}

      <View style={tailwind("flex-row items-center justify-center px-1 w-10")}>
        {!!slotsLength && (
          <View
            style={tailwind(
              `rounded-full w-1.5 h-1.5 mr-1 ${slotsLength < 2
                ? "bg-error"
                : slotsLength < 4
                  ? "bg-warning"
                  : "bg-green-500"
              }`
            )}
          />
        )}

        <Typography
          variant="10"
          className="text-xs"
          weight={"regular"}
          numberOfLines={1}
          color={isSelected ? "primary-300" : disabled ? "gray-500" : "black"}
        >
          {slotsLength ? `${slotsLength} Available` : "-"}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};
