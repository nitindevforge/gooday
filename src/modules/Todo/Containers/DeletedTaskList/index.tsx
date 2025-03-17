import React, { useMemo, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  SectionList,
} from "react-native";
import { Button, EmptyComponent, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { TaskHeader, TodoListItem } from "../../Components";
import {
  DropdownIconModal,
  MY_FRIENDS_TASK_LIST,
  MY_TASK_LIST,
  TASK_LIST,
  usePermanentTaskDelete,
  useRestoreTask,
  useTaskList,
} from "@app/modules";
import moment from "moment";
import { TaskCheckView } from "../../Components/TaskCheckbox/type";
import { TaskEntity } from "@gooday_corp/gooday-api-client";
import { queryClient } from "../../../../index";

export const DeletedTaskListContainer = () => {
  const tailwind = useTailwind();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskEntity["id"][]>([]);
  const { mutate, isLoading } = usePermanentTaskDelete();
  const { mutate: restoreTask, isLoading: isRestoreLoading } = useRestoreTask();
  const [view, setView] = useState<TaskCheckView>(
    TaskCheckView.COMPLETION_TOGGLE
  );

  const {
    data,
    isLoading: isTodayLoading,
    isRefetching: isTodayRefetching,
    refetch: todayRefetch,
  } = useTaskList({
    start: moment().startOf("day").format(),
    end: moment().endOf("day").format(),
    isDeleted: true,
  });

  const { data: lastWeekTasks, isLoading: isWeeklyLoading,isRefetching,refetch } = useTaskList({
    start: moment()
      .startOf("day")
      .subtract(1, "day")
      .subtract(1, "week")
      .format(),
    end: moment().startOf("day").subtract(1, "day").format(),
    isDeleted: true,
  });

  const handleTaskDelete = () => {
    selectedTask.map((id) =>
      mutate(id, {
        onSuccess: () => {
          setSelectedTask((prev) => prev.filter((el) => el !== id));
        },
      })
    );
  };

  const restoreSendTask = () => {
    selectedTask.map((id, index) =>
      restoreTask(id, {
        onSuccess: () => {
          if (selectedTask.length - 1 === index) {
            queryClient.invalidateQueries(TASK_LIST);
            queryClient.invalidateQueries(MY_FRIENDS_TASK_LIST);
            queryClient.invalidateQueries(MY_TASK_LIST);
          }
        },
      })
    );
  };

  const handleDone = () => {
    setView(TaskCheckView.COMPLETION_TOGGLE);

    if (view === TaskCheckView.RESTORE) {
      restoreSendTask();
      return;
    }
    if (view === TaskCheckView.DELETABLE) {
      Alert.alert(
        "Are you sure!",
        "you want to delete this task permanently?",
        [{ text: "Cancel" }, { text: "Ok", onPress: handleTaskDelete }],
        { cancelable: true }
      );
      return;
    }
  };

  const handleTaskSelect = (task: TaskEntity) => {
    if (
      view === TaskCheckView.SELECTABLE ||
      view === TaskCheckView.DELETABLE ||
      view === TaskCheckView.RESTORE
    ) {
      let updated = [...selectedTask];
      if (selectedTask.includes(task.id)) {
        updated = updated.filter((el) => el !== task.id);
      } else {
        updated = [...updated, task.id];
      }

      setSelectedTask(updated);

      if (!updated.length) {
        setView(TaskCheckView.COMPLETION_TOGGLE);
      }
    }
  };

  const todoOptions = [
    {
      label: "Restore Tasks",
      icon: {
        name: "count-down",
        outline: false,
        width: 20,
        height: 20,
        fill: "black",
        stroke: "none",
      },
      onPress: () => setView(TaskCheckView.RESTORE),
      textColor: "black",
    },

    {
      label: "Permanent Delete Tasks",
      icon: {
        name: "delete",
        height: 20,
        width: 20,
        stroke: "#E24653",
      },
      onPress: () => {
        setView((prev) =>
          prev === TaskCheckView.DELETABLE
            ? TaskCheckView.COMPLETION_TOGGLE
            : TaskCheckView.DELETABLE
        );
      },
      textColor: "secondary-500",
    },
  ];

  const onRefetch = () => {
    todayRefetch();
    refetch();
  };

  const sections = useMemo(() => {
    return [
      {
        title: "Today",
        data: data?.data?.data ?? [],
        loading: isTodayLoading || isLoading || isRestoreLoading,
      },
      {
        title: "Last 7 days",
        data: lastWeekTasks?.data?.data ?? [],
        loading: isWeeklyLoading || isLoading || isRestoreLoading,
      },
    ].filter((el) => el.data.length);
  }, [data, lastWeekTasks]);

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <StatusBar barStyle="dark-content" />
      <View style={[tailwind("flex-1"), { rowGap: 24 }]}>
        <View style={tailwind("flex-row")}>
          <TaskHeader header="Recently Deleted" style={tailwind("mt-0")} />
          <View
            style={[
              tailwind("flex-row items-center flex-1 justify-end"),
              { gap: 12 },
            ]}
          >
            <DropdownIconModal
              variant="between"
              data={todoOptions?.filter((el) => el)}
              icon={{
                name: "circle-dots",
                width: 30,
                height: 30,
              }}
              onModal={(value) => setMenuOpen(value)}
              visible={isMenuOpen}
            />
          </View>
        </View>
        <SectionList
          sections={sections}
          refreshing={isRefetching || isTodayRefetching}
          onRefresh={onRefetch}
          renderItem={({ index, item, section: { data, loading } }) => (
            <TodoListItem
              data={data}
              index={index}
              task={item}
              key={item.id}
              view={view}
              taskCheckBox={{
                task: item,
                view: view,
                isChecked: selectedTask.includes(item.id),
                isLoading: loading,
                onPress: () => handleTaskSelect(item),
              }}
              taskInput={{
                draggable: false,
                readonly: true,
                task: item,
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
        {view !== TaskCheckView.COMPLETION_TOGGLE && !!selectedTask.length && (
          <Button className="mb-4" title="Done" onPress={handleDone} />
        )}
      </View>
    </SafeAreaView>
  );
};
