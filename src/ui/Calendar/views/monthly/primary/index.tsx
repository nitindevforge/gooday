import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { FlatList, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { CalendarProps, Typography, useMonthlyCalendarConfig } from "@app/ui";
import { useCommonCalendarConfig } from '@app/ui';

export const MonthlyViewPrimary = <T,>(props: Omit<CalendarProps<T>, 'view'>) => {
  const tailwind = useTailwind();

  const {
    events = [],
    onPress,
    disabledDates,
    date,
  } = props as any;

  const { daysOfWeek, calendarDates, snapInterval, getItemLayout } = useCommonCalendarConfig({
    date,
  });
  const { renderItem } = useMonthlyCalendarConfig<T>({
    calendarDates,
    events,
    onPress,
    disabledDates,
    variant: 'primary',
  });

  return (
    <View style={[tailwind("py-4 rounded-xl border-gray-600")]}>
      <View style={[tailwind("flex-row justify-between items-start")]}>
        {daysOfWeek?.map((day, index) => {
          return (
            <Typography
              className='flex-1 text-center'
              key={index}
              weight="medium"
              variant="base"
            >
              {day}
            </Typography>
          )
        })}
      </View>
      <View style={[{ height: 1 }, tailwind('bg-gray-translucent mt-1.5 w-full')]} />
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