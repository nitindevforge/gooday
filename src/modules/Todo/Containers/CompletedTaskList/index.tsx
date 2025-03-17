import React, { useMemo } from "react";
import { View, SafeAreaView, StatusBar, SectionList } from "react-native";
import { EmptyComponent, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { TaskHeader, TodoListItem } from "../../Components";
import { useTaskList } from "@app/modules";
import moment from "moment";
import { TaskCheckView } from "../../Components/TaskCheckbox/type";

export const CompletedTaskListContainer = () => {
  const tailwind = useTailwind();

  const {
    data,
    isLoading: isTodayLoading,
    isRefetching: isTodayRefetching,
    refetch: todayRefetch,
  } = useTaskList({
    start: moment().startOf("day").format(),
    end: moment().endOf("day").format(),
    status: "COMPLETED",
  });

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
    status: "COMPLETED",
  });

  const sections = useMemo(() => {
    return [
      {
        title: "Today",
        data: data?.data?.data ?? [],
        loading: isTodayLoading,
      },
      {
        title: "Last 7 days",
        data: lastWeekTasks?.data?.data ?? [],
        loading: isWeeklyLoading,
      },
    ].filter((el) => el.data.length);
  }, [data, lastWeekTasks]);

  const onRefetch = () => {
    todayRefetch();
    refetch();
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <StatusBar barStyle="dark-content" />
      <View style={[tailwind("flex-1"), { rowGap: 24 }]}>
        <TaskHeader header="Completed" />
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sections}
          refreshing={isRefetching || isTodayRefetching}
          onRefresh={onRefetch}
          renderItem={({ index, item, section: { data, loading } }) => (
            <TodoListItem
              data={data}
              index={index}
              task={item}
              key={item.id}
              view={TaskCheckView.COMPLETION_TOGGLE}
              taskCheckBox={{
                task: item,
                view: TaskCheckView.COMPLETION_TOGGLE,
                isLoading: loading,
              }}
              taskInput={{
                task: item,
                draggable: false,
              }}
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
