import React, { useEffect, useRef, useState } from 'react';
import moment from "moment";
import { ReactElement } from "react";
import { FlatList, ListRenderItemInfo, } from "react-native";
import { WeekDayComponent, WeekDaySlot } from "../components";
import { BaseCalendarSlot } from '../types';

interface WeeklyCalendarConfigProps<T> {
  calendarDates: string[];
  onPress?: (data: Date) => void;
  disabledDates?: Array<Date>;
  date?: Date;
  slots?: Array<BaseCalendarSlot>;
  variant?: 'primary' | 'secondary';
}

export const useWeeklyCalendarConfig = <T,>({
  onPress,
  disabledDates,
  date,
  calendarDates,
  variant,
  slots,
}: WeeklyCalendarConfigProps<T>) => {
  const flatListRef = useRef<FlatList>(null);
  const [selectedDate, setSelectedDate] = useState<moment.MomentInput>(moment(date));

  useEffect(() => {
    if (date) {
      setSelectedDate(date)
    }
  }, [date])

  const onDateSelection = (item: Date) => {
    scrollToIndex()
    setSelectedDate(item);
    onPress?.(item);
  }

  useEffect(() => {
    scrollToIndex()
  }, [date])

  const scrollToIndex = () => {
    const activeIndex = calendarDates?.findIndex((element) => {
      return moment(element).format('YYYY-MM-DD') === moment(selectedDate).format('YYYY-MM-DD')
    });

    if (activeIndex >= 0) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: activeIndex,
        ...(variant === 'primary' && { viewPosition: 0.5 })
      });
    }
    return activeIndex
  }

  useEffect(() => {
    scrollToIndex()
  }, [date])

  const renderWeekItemForPrimary = ({ item, index }: ListRenderItemInfo<string>): ReactElement<any, any> => {
    const isDisabledDate = disabledDates?.some((date) => moment(date).isSame(item, 'date'));

    return (
      <WeekDayComponent
        item={item as any}
        onPress={onDateSelection}
        isSelected={moment(selectedDate).isSame(item, 'date')}
        isDisabled={!!isDisabledDate}
      />
    )
  }

  const renderWeekItemForSecondary = ({ item, index }: ListRenderItemInfo<string>): ReactElement<any, any> => {
    const isDisabledDate = disabledDates?.some((date) => moment(date).isSame(item, 'date'));

    const todaysSlots = slots?.find((slot) => moment(slot.date).isSame(item, 'date'));

    return (
      <WeekDaySlot
        item={item as any}
        onPress={onDateSelection}
        isSelected={moment(selectedDate).isSame(item, 'date')}
        isDisabled={!!isDisabledDate}
        slots={todaysSlots?.slots || []}
      />
    )
  }


  return {
    renderItem: variant === 'primary' ? renderWeekItemForPrimary : renderWeekItemForSecondary,
    flatListRef,
    scrollToIndex,
  }
}