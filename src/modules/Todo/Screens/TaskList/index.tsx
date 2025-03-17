import { SafeAreaView, SectionList, StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TaskHeader, TodoListItem } from "../../Components";
import { EmptyComponent, Typography } from "@app/ui";
import { useTaskList } from "../../Data";
import { useActiveTodo } from "../../Hooks";
import moment from "moment";
import { useMemo } from "react";
import { TaskCheckView } from "../../Components/TaskCheckbox/type";

export const TaskListScreen = () => {
  const tailwind = useTailwind();
  const { activeTodo } = useActiveTodo();

  const { data, isLoading: isTodayLoading } = useTaskList({
    todo: activeTodo?.id ?? "",
    start: moment().startOf("day").format(),
    end: moment().endOf("day").format(),
    status: "COMPLETED",
  });

  const { data: lastWeekTasks, isLoading: isWeeklyLoading } = useTaskList({
    todo: activeTodo?.id ?? "",
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

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <StatusBar barStyle="dark-content" />
      <View style={[tailwind("px-6 flex-1"), { rowGap: 24 }]}>
        <TaskHeader header="Completed" />
        <SectionList
          sections={sections}
          renderItem={({ index, item, section: { data, loading } }) => (
            <TodoListItem
              data={data}
              index={index}
              task={item}
              key={item.id}
              view={TaskCheckView.COMPLETION_TOGGLE}
              taskInput={{
                readonly: true,
                task: item,
                draggable: false
              }}
              taskCheckBox={{
                task: item,
                view: TaskCheckView.COMPLETION_TOGGLE,
                isChecked: true,
                isLoading: loading,
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
