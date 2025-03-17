import { Typography } from "@app/ui";
import clsx from "clsx";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { getFormattedDate } from "@app/utils";
import { DayCardProps } from "../WeekCalendar/type";

export const DayAvailabilityCard: FC<DayCardProps> = ({
  day,
  active,
  onPress,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind(
          clsx("border-gray-600 flex-1", {
            "border-secondary-100": active,
          })
        ),
        {
          borderWidth: 1.5,
          height: 93,
          borderRadius: 10,
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View>
          <View
            style={[
              tailwind("items-center pt-2"),
              {
                rowGap: 10,
              },
            ]}
          >
            <Typography
              weight={active ? "bold" : "light"}
              variant="xs"
              color={active ? "secondary-100" : "gray-200"}
            >
              {getFormattedDate("ddd", day)}
            </Typography>
            <Typography
              weight={active ? "bold" : "regular"}
              color={active ? "secondary-100" : "black"}
            >
              {getFormattedDate("DD", day)}
            </Typography>
            <View style={[tailwind("flex-row items-center"), { columnGap: 4 }]}>
              <View
                style={tailwind("w-[6px] h-[6px] bg-[#088626] rounded-full")}
              ></View>
              <Typography color="secondary-100" weight="medium" variant="10">
                4 Slots
              </Typography>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
