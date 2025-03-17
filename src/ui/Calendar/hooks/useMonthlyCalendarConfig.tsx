import React from 'react';
import moment from "moment";
import { ReactElement } from "react";
import { ListRenderItemInfo, TouchableOpacity, View } from "react-native";
import { DayComponent } from "../components";
import { useTailwind } from 'tailwind-rn';
import { BaseCalendarSlot, CalendarDates } from '../types';
import Typography from '../../Typography';
import { SecondaryDayComponent } from '../components/SecondaryDayComponent';

interface MonthlyCalendarConfigProps<T> {
  calendarDates: CalendarDates;
  events: Array<T>;
  onPress?: (data: Date) => void;
  disabledDates?: Array<Date>;
  variant: 'primary' | 'secondary';
  date?: Date;
  slots?: Array<BaseCalendarSlot>;
}

export const useMonthlyCalendarConfig = <T,>({
  calendarDates,
  events,
  onPress,
  disabledDates,
  variant,
  date,
  slots
}: MonthlyCalendarConfigProps<T>) => {
  const tailwind = useTailwind();
  const totalHeightForIndividualItem = 30;
  const totalItemsPerDateToShow = 4;
  const itemHeight = totalHeightForIndividualItem / totalItemsPerDateToShow;

  const renderPrimaryMonthItem = ({ item: listItem, index }: ListRenderItemInfo<String>): ReactElement<any, any> => {
    const item = listItem as unknown as Date;
    const array = calendarDates.map((item) => item.date);
    const dateObject = calendarDates[index];

    const chunkSize = 7;
    const result: any = [];

    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }

    const isLastRow = result[result?.length - 1]?.includes(item);
    const isDisabledDate = disabledDates?.some((date) => moment(date).isSame(item, 'date'));

    const eventsForDate = events.filter((event: any) => {
      return moment(item).isBetween(moment(event?.startDate), moment(event?.endDate), 'date', '[]');
    });

    const isStartDate = eventsForDate.some((event: any) => moment(event?.startDate).isSame(item, 'date'));
    const isEndDate = eventsForDate.some((event: any) => moment(event?.endDate).isSame(item, 'date'));

    const isDisabled = dateObject.monthType !== 'current' || !!isDisabledDate;

    const eventNodes = eventsForDate.map((event: any, index) => {
      if (typeof event?.renderComponent !== 'function') {
        return null;
      }

      return (
        <View
          style={[
            tailwind(`${isStartDate ? 'rounded-l-[3px]' : isEndDate ? 'rounded-r-[3px]' : ''}`),
            { height: itemHeight, overflow: 'hidden' }
          ]}
        >
          {event?.renderComponent(event, index, {
            isDisabled,
          })}
        </View>
      );
    }).filter(Boolean);

    return (
      <TouchableOpacity
        activeOpacity={1}
        disabled={isDisabled}
        onPress={() => onPress?.(item)}
        style={[tailwind(`border-gray-translucent flex-1`), { borderBottomWidth: isLastRow ? 0 : 1 }]}>
        <DayComponent
          item={item}
          isDisabled={isDisabled}
          onPress={onPress}
        />
        <View style={{ height: totalHeightForIndividualItem, gap: 2, marginBottom: 12 }}>
          {eventNodes.length > totalItemsPerDateToShow ? eventNodes.slice(0, totalItemsPerDateToShow - 1).map((node, index) => (
            <View key={index}>
              {node}
            </View>
          )).concat(
            <View key={index}>
              <Typography weight="semibold" variant="9">
                +{eventNodes.length - (totalItemsPerDateToShow - 1)}
              </Typography>
            </View>
          ) : eventNodes.map((node, index) => (
            <View key={index}>
              {node}
            </View>
          ))}
        </View>
      </TouchableOpacity>
    )
  };

  const renderSecondaryMonthItem = ({ item: listItem, index }: ListRenderItemInfo<String>): ReactElement<any, any> => {
    const item = listItem as unknown as Date;
    const array = calendarDates.map((item) => item.date);
    const dateObject = calendarDates[index];

    const chunkSize = 7;
    const result: any = [];

    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }

    const isDisabledDate = disabledDates?.some((date) => moment(date).isSame(item, 'date'));

    const isDisabled = dateObject.monthType !== 'current' || !!isDisabledDate;

    const hasSlotsToday = slots?.some((slot) => {
      return moment(slot.date).isSame(item, 'date') && slot.slots?.filter((element) => element?.isAvailable === true).length > 0;
    });

    return (
      <View style={tailwind('flex-1')}>
        <SecondaryDayComponent
          onPress={onPress}
          item={item}
          isDisabled={isDisabled}
          isSelected={moment(date).isSame(item, 'date')}
          hasSlotsToday={hasSlotsToday}
          slots={slots?.find((slot) => moment(slot.date).isSame(item, 'date'))?.slots || []}
        />
      </View>
    )
  };

  return {
    renderItem: variant === 'primary' ? renderPrimaryMonthItem : renderSecondaryMonthItem,
  }
}