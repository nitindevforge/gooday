import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, SafeAreaView, StatusBar, SectionList } from "react-native";
import { EmptyComponent, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { TaskHeader, TodoListItem } from "../../Components";
import { useTaskList } from "@app/modules";
import moment from "moment";
import { TaskCheckView } from "../../Components/TaskCheckbox/type";
import {
  AnimatedSwipe,
  AnimatedSwipeProperties,
} from "../../Components/AnimatedSwipe";
import { TaskEntity } from "@gooday_corp/gooday-api-client";

export const UrgentTaskListContainer = () => {
  const tailwind = useTailwind();

  const taskRefs = useRef<Record<number, AnimatedSwipeProperties>>({});
  const shouldSwipeLeftRef = useRef<boolean>(true);
  const [todayTasks, setTodayTasks] = useState<TaskEntity[]>([]);

  const {
    data,
    isLoading: isTodayLoading,
    isRefetching: isTodayRefetching,
    refetch: todayRefetch,
  } = useTaskList({
    start: moment().startOf("day").format(),
    end: moment().endOf("day").format(),
    urgent: true,
    status: "PENDING",
  });

  useEffect(() => {
    setTodayTasks(data?.data?.data || ([] as TaskEntity[]));
  }, [data?.data?.data]);

  const lastWeekTaskRefs = useRef<Record<number, AnimatedSwipeProperties>>({});
  const lastWeekShouldSwipeLeftRef = useRef<boolean>(true);
  const [weeklyTasks, setWeeklyTasks] = useState<TaskEntity[]>([]);

  const {
    data: lastWeekTasks,
    isLoading: isWeeklyLoading,
    isRefetching,
    refetch,
  } = useTaskList({
    start: moment()
      .startOf("day")
      .subtract(1, "day")
      .subtract(1, "week")
      .format(),
    end: moment().startOf("day").subtract(1, "day").format(),
    urgent: true,
    status: "PENDING",
  });

  useEffect(() => {
    setWeeklyTasks(lastWeekTasks?.data?.data || ([] as TaskEntity[]));
  }, [lastWeekTasks?.data?.data]);

  const onTodayCompleteSuccess = (index: number) => {
    const animatedSwipeProperty = taskRefs?.current?.[index];
    const method = shouldSwipeLeftRef.current
      ? animatedSwipeProperty?.slideLeft
      : animatedSwipeProperty?.slideRight;
    method(() =>
      setTodayTasks((prev) =>
        prev.filter((_, itemIndex) => itemIndex !== index)
      )
    );
    shouldSwipeLeftRef.current = !shouldSwipeLeftRef.current;
  };

  const onLastWeekCompleteSuccess = (index: number) => {
    const animatedSwipeProperty = lastWeekTaskRefs?.current?.[index];
    const method = lastWeekShouldSwipeLeftRef.current
      ? animatedSwipeProperty?.slideLeft
      : animatedSwipeProperty?.slideRight;
    method(() =>
      setWeeklyTasks((prev) =>
        prev.filter((_, itemIndex) => itemIndex !== index)
      )
    );
    lastWeekShouldSwipeLeftRef.current = !lastWeekShouldSwipeLeftRef.current;
  };

  const sections = useMemo(() => {
    return [
      {
        title: "Today",
        data: todayTasks,
        loading: isTodayLoading,
        onCompleteSuccess: onTodayCompleteSuccess,
        refElement: taskRefs,
      },
      {
        title: "Last 7 days",
        data: weeklyTasks,
        loading: isWeeklyLoading,
        onCompleteSuccess: onLastWeekCompleteSuccess,
        refElement: lastWeekTaskRefs,
      },
    ].filter((el) => el.data.length);
  }, [todayTasks, weeklyTasks]);

  const onRefetch = () => {
    todayRefetch();
    refetch();
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <StatusBar barStyle="dark-content" />
      <View style={[tailwind("flex-1"), { rowGap: 24 }]}>
        <TaskHeader header="Urgent" />
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sections}
          refreshing={isRefetching || isTodayRefetching}
          onRefresh={onRefetch}
          renderItem={({
            index,
            item,
            section: { data, loading, onCompleteSuccess, refElement },
          }) => (
            <TodoListItem
              data={data}
              index={index}
              task={item}
              key={item.id}
              view={TaskCheckView.COMPLETION_TOGGLE}
              taskCheckBox={{
                task: item,
                view: TaskCheckView.COMPLETION_TOGGLE,
                isChecked: true,
                isLoading: loading,
                onCompleteSuccess: () => onCompleteSuccess(index),
              }}
              taskInput={{
                task: item,
                draggable: false,
              }}
              containerRef={(ref, index) =>
                (refElement.current = {
                  ...refElement.current,
                  [index]: ref,
                })
              }
              listContainer={AnimatedSwipe}
            />
          )}
          ListEmptyComponent={<EmptyComponent />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={tailwind("w-full bg-white pb-2")}>
              <Typography variant="base" weight="medium">
                {title}
              </Typography>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
