import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import moment from "moment";
import { WeekCalendarProps } from "./type";
import { getFormattedDate } from "@app/utils";
import { DayCard } from "@app/modules";
import clsx from "clsx";

export const WeekCalendar: FC<WeekCalendarProps> = ({
  today,
  setToday,
  onDayChange = () => {},
  dayCard: DayCardComponent,
  dayLimit = 3,
  style,
  changeWeek,
}) => {
  const tailwind = useTailwind();
  const [week, setWeek] = useState<string[]>([]);

  const getPrevNextDates = (days: number) => {
    const currentDate = today ? moment(today) : moment();
    const dates = [];
    for (let i = -days; i <= days; i++) {
      dates.push(currentDate.clone().add(i, "days").format("YYYY-MM-DD"));
    }
    return dates;
  };

  useEffect(() => {
    if (!today) {
      setToday(getFormattedDate("YYYY-MM-DD"));
    }
  }, [today]);

  useEffect(() => {
    const dates = getPrevNextDates(dayLimit);
    setWeek(dates);
  }, [changeWeek, dayLimit]);

  return (
    <View style={[tailwind("flex-row items-center"), style]}>
      {week?.map((day, index) => (
        <>
          {DayCardComponent ? (
            <DayCardComponent
              active={day === today}
              day={day}
              index={index}
              onPress={() => onDayChange(day)}
            />
          ) : (
            <DayCard
              active={day === today}
              day={day}
              index={index}
              onPress={() => onDayChange(day)}
            />
          )}
        </>
      ))}
    </View>
  );
};
