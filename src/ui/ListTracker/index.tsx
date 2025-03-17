import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ListRenderItemInfo,
  SafeAreaView,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import ReorderableList, {
  ReorderableListItem,
  useReorderableDragStart,
  useReorderableDragEnd,
  ReorderableListReorderEvent,
  ReorderableListProps,
} from "react-native-reorderable-list";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import clsx from "clsx";

interface ListTrackerProps<T>
  extends Omit<ReorderableListProps<T>, "onReorder" | "renderItem"> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  renderSeparator: (item: T, index: number) => React.ReactNode;
  gap?: number;
  keyExtractor?: ((item: T, index: number) => string) | undefined;
  onReorder?: (event: ReorderableListReorderEvent) => void;
  alignment?: "top" | "center";
  lineStyle?: ViewStyle;
  listContainer?: any;
  containerRef?: (ref: any, index: number) => void;
}

function ListTrackerItem<T>({
  item,
  index,
  data,
  renderItem,
  renderSeparator,
  alignment,
  gap = 12,
  lineStyle,
  listContainer,
  containerRef,
}: ListRenderItemInfo<T> & ListTrackerProps<T>) {
  const tailwind = useTailwind();
  const [isDragging, setDragging] = useState(false);

  const Container: any = listContainer ? listContainer : View;

  const handleDragStart = useCallback(() => {
    "worklet";
    runOnJS(setDragging)(true);
  }, []);

  const handleDragEnd = useCallback(() => {
    "worklet";
    runOnJS(setDragging)(false);
  }, []);

  useReorderableDragStart(handleDragStart);
  useReorderableDragEnd(handleDragEnd);

  return (
    <Container
      ref={(ref: any) => containerRef?.(ref, index)}
      style={[
        tailwind("flex-row px-1"),
        alignment === "top" && tailwind("items-start"),
        alignment === "center" && tailwind("items-center"),
      ]}
    >
      <View style={tailwind("pr-4 relative")}>
        {data.length - 1 !== index && !isDragging && (
          <View
            style={[
              tailwind(
                clsx("bg-gray-600 flex-1 absolute h-full bottom-0 left-1/2", {
                  "bg-black": item?.isBefore,
                })
              ),
              { marginLeft: -2, top: gap, width: 2 },
              lineStyle,
            ]}
          >
            {item?.isBetween && (
              <View
                style={[
                  tailwind("bg-black"),
                  { width: 2, height: `${item?.progress}%`, paddingTop: 50 },
                ]}
              >
                <View
                  style={[
                    tailwind("h-2 w-2 bg-black rounded-full absolute"),
                    {
                      bottom: -5,
                      right: -3,
                    },
                  ]}
                ></View>
              </View>
            )}
          </View>
        )}

        <View style={{ marginVertical: gap, marginLeft: -3 }}>
          {renderSeparator(item, index)}
        </View>
      </View>
      <View style={[tailwind("flex-1"), { paddingVertical: gap }]}>
        {renderItem(item)}
      </View>
    </Container>
  );
}

export function ListTracker<T>({
  data,
  renderItem,
  gap = 12,
  renderSeparator: renderSeparator,
  keyExtractor,
  onReorder,
  alignment = "top",
  scrollEnabled = true,
  lineStyle,
  listContainer,
  containerRef,
  ...rest
}: ListTrackerProps<T>) {
  const tailwind = useTailwind();
  const listScrollRef = useRef<any>(null);
  useEffect(() => {
    if (!scrollEnabled) {
      listScrollRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [scrollEnabled]);

  const sortableItem = (props: ListRenderItemInfo<T>) => (
    <ReorderableListItem
      scaleAnimationConfig={{ valueStart: 1.01, valueEnd: 1 }}
    >
      <ListTrackerItem
        {...props}
        renderItem={renderItem}
        renderSeparator={renderSeparator}
        data={data}
        gap={gap}
        alignment={alignment}
        lineStyle={lineStyle}
        listContainer={listContainer}
        containerRef={containerRef}
      />
    </ReorderableListItem>
  );

  const handleReorder = (event: ReorderableListReorderEvent) => {
    onReorder?.(event);
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <GestureHandlerRootView>
        <ReorderableList
          ref={listScrollRef}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
          data={data ?? []}
          onReorder={handleReorder}
          renderItem={sortableItem}
          keyExtractor={keyExtractor}
          {...rest}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
