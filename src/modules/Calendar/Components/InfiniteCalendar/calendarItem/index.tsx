import React, { memo, useMemo } from "react";
import { View } from "react-native";
import { ITEM_HEIGHT } from "../constants";
import { getCalendarDates } from "@app/ui";
import { groupBySeven } from "../utils";
import { CalendarMonth } from "../calendarMonth";

export const CalendarItem: React.FC<{
  month: string;
  onPress: (date: Date) => void;
}> = memo(({
  month,
  onPress,
}) => {
  const groupedDates = useMemo(
    () => groupBySeven(getCalendarDates(new Date(month))),
    [month]
  );

  return (
    <View style={{ height: ITEM_HEIGHT }}>
      <CalendarMonth
        groupedDates={groupedDates}
        month={month}
        onPress={onPress}
      />
    </View>
  );
})