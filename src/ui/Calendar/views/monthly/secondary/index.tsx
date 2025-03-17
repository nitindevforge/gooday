import React from 'react';
import { CalendarProps, Typography, useCommonCalendarConfig, useMonthlyCalendarConfig } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { FlatList, View } from 'react-native';

export const MonthlyViewSecondary = <T,>(props: Omit<CalendarProps<T>, 'view'>) => {
  const tailwind = useTailwind();

  const {
    onPress,
    disabledDates,
    date,
    slots = [],
  } = props as any;

  const { daysOfWeek, calendarDates, snapInterval, getItemLayout } = useCommonCalendarConfig({
    date,
  });
  const { renderItem } = useMonthlyCalendarConfig<T>({
    calendarDates,
    events: [],
    onPress,
    disabledDates,
    variant: 'secondary',
    date,
    slots,
  });

  return (
    <View style={[tailwind("py-4 rounded-xl border-gray-600")]}>
      <View style={[tailwind("flex-row justify-between items-start mb-4")]}>
        {daysOfWeek?.map((day, index) => {
          return (
            <Typography
              className='flex-1 text-center'
              key={index}
              weight="medium"
              variant="11"
            >
              {day}
            </Typography>
          )
        })}
      </View>
      <FlatList
        data={calendarDates.map((item) => item.date)}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={7}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        snapToInterval={snapInterval}
        getItemLayout={getItemLayout}
      />
    </View>
  )
}