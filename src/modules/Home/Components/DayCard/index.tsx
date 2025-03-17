import { Typography } from "@app/ui";
import clsx from "clsx";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { getFormattedDate } from "@app/utils";
import { DayCardProps } from "../WeekCalendar/type";

export const DayCard: FC<DayCardProps> = ({ day, active, onPress }) => {
  const tailwind = useTailwind();

  return (
    <View
      style={tailwind(
        clsx({
          "w-15": active,
          "flex-1": !active,
        })
      )}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={[
            {
              height: 67,
            },
            tailwind(
              clsx("pt-2 items-center", {
                "rounded-10 bg-[#3B5AC9] px-0": active,
              })
            ),
          ]}
        >
          <View style={tailwind("items-center")}>
            <Typography
              weight={active ? "bold" : "light"}
              variant="xs"
              color={active ? "white" : "gray-200"}
            >
              {getFormattedDate("dd", day)?.slice(0, 1)}
            </Typography>
            <Typography
              weight={active ? "bold" : "regular"}
              color={active ? "white" : "black"}
              className="mt-1"
            >
              {getFormattedDate("DD", day)}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
