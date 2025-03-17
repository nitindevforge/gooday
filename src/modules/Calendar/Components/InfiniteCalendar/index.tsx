import { MomentInput } from "moment";
import { ITEM_HEIGHT, SEPARATOR_HEIGHT, TOTAL_MONTH_BUFFER } from "./constants";
import { memo, useCallback } from "react";
import { FlatList, View, ViewToken } from "react-native";
import { CalendarItem } from "./calendarItem";

export const InfiniteCalendar: React.FC<{
  onScroll: (date: MomentInput) => void;
  allMonths: string[];
  currentMonthIndex: number;
  currentRange: number[];
  setCurrentRange: (data: number[]) => void;
  onPress: (date: Date) => void;
}> = memo(({
  onScroll,
  allMonths,
  currentMonthIndex,
  currentRange,
  setCurrentRange,
  onPress,
}) => {
  const onViewableItemsChanged = useCallback(
    (info: {
      viewableItems: Array<ViewToken<string>>;
      changed: Array<ViewToken<string>>;
    }) => {
      const visibleMonth = info.viewableItems[0]?.item;

      if (!visibleMonth) return;

      onScroll(visibleMonth);

      const latestMonthIndex = allMonths.indexOf(visibleMonth);

      const [
        currentRangeStartIndex,
        currentRangeEndIndex,
      ] = currentRange;

      const scrollThresholdExceeded = (latestMonthIndex <= currentRangeStartIndex) || (latestMonthIndex >= currentRangeEndIndex);

      if (scrollThresholdExceeded) {
        setCurrentRange([
          latestMonthIndex - TOTAL_MONTH_BUFFER,
          latestMonthIndex + TOTAL_MONTH_BUFFER,
        ]);
      }

    },
    [currentRange]
  );

  return (
    <FlatList
      data={allMonths}
      keyExtractor={(item) => item.toString()}
      onViewableItemsChanged={onViewableItemsChanged}
      ItemSeparatorComponent={() => <View style={{ height: SEPARATOR_HEIGHT }} />}
      renderItem={({ item }) => <CalendarItem month={item} onPress={onPress} />}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={12}
      initialNumToRender={12}
      initialScrollIndex={currentMonthIndex}
      getItemLayout={(_, index) => ({
        index,
        length: ITEM_HEIGHT + SEPARATOR_HEIGHT,
        offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index,
      })}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 50,
      }}
    />
  );
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.currentRange) === JSON.stringify(nextProps.currentRange);
});