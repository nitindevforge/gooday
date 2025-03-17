import React from 'react';
import { CalendarProps, useCommonCalendarConfig, useWeeklyCalendarConfig } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { FlatList, View } from 'react-native';

export const WeeklyView = <T,>(props: Omit<CalendarProps<T>, 'view'>) => {
  const tailwind = useTailwind();

  const {
    onPress,
    disabledDates,
    date,
    variant,
    slots = [],
    selectedDateFromMonth
  } = props as any;

  const { calendarDatesForWeeks, snapInterval, getItemLayout } = useCommonCalendarConfig({
    date,
    variant,
    selectedDateFromMonth
  });
  const { renderItem, flatListRef, scrollToIndex } = useWeeklyCalendarConfig<T>({
    calendarDates: calendarDatesForWeeks,
    onPress,
    disabledDates,
    date,
    slots,
    variant,
  });

  return (
    <View style={[tailwind("py-4 rounded-xl border-gray-600")]}>
      <FlatList
        ref={flatListRef}
        data={calendarDatesForWeeks.map((item) => item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={undefined}
        scrollEnabled
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        snapToInterval={snapInterval}
        getItemLayout={getItemLayout}
        onLayout={() => {
          scrollToIndex();
        }}
        ItemSeparatorComponent={() => {
          if (variant === 'primary') {
            return null
          }

          return (
            <View style={[{ width: 10 }, tailwind('h-full')]} />
          );
        }}
      />
    </View>
  )
}