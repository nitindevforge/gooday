import {
  HomeNavigationParamList,
  TodoListItem,
  TodoNavigationStackParamList,
  useMyFriendsTaskList,
  useTaskDelete,
} from "@app/modules";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { Button, EmptyComponent, Loading } from "@app/ui";
import { TaskEntity } from "@gooday_corp/gooday-api-client";
import { Alert, FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  AnimatedSwipe,
  AnimatedSwipeProperties,
} from "../../Components/AnimatedSwipe";
import { MyFriendsTaskListProps } from "./type";
import { TaskCheckView } from "../../Components/TaskCheckbox/type";

export const MyFriendsTaskList: FC<MyFriendsTaskListProps> = ({
  setView,
  view,
}) => {
  const {
    data,
    isLoading: isTasklistLoading,
    isRefetching,
    refetch,
  } = useMyFriendsTaskList();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        TodoNavigationStackParamList & HomeNavigationParamList
      >
    >();

  const { mutate, isLoading: isDeletingTask } = useTaskDelete();
  const [tasks, setTasks] = useState<TaskEntity[]>([]);

  const taskRefs = useRef<Record<number, AnimatedSwipeProperties>>({});
  const shouldSwipeLeftRef = useRef<boolean>(true);

  useEffect(() => {
    setTasks(
      data?.data?.data?.filter(
        (task) => task?.status !== "COMPLETED"
      ) as TaskEntity[]
    );
  }, [data?.data?.data]);

  const isLoading = isTasklistLoading;
  isDeletingTask || isRefetching;

  const [selectedTask, setSelectedTask] = useState<TaskEntity["id"][]>([]);

  const handleTaskSelect = (task: TaskEntity) => {
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
  };

  const handleTaskDelete = () => {
    selectedTask.map((id, index) =>
      mutate(id, {
        onSuccess: () => {
          setSelectedTask((prev) => prev.filter((el) => el !== id));
        },
      })
    );
  };

  const handleSendTask = () => {
    setSelectedTask([]);
    navigation.navigate("ASSIGN_TASK", {
      tasks:
        data?.data?.data?.filter((el) => selectedTask.includes(el.id)) ?? [],
    });
  };

  const handleDone = () => {
    setView(TaskCheckView.COMPLETION_TOGGLE);

    if (view === TaskCheckView.SELECTABLE) {
      handleSendTask();
      return;
    }
    if (view === TaskCheckView.DELETABLE) {
      Alert.alert(
        "Are you sure you want to delete this task?",
        "",
        [{ text: "Cancel" }, { text: "Ok", onPress: handleTaskDelete }],
        { cancelable: true }
      );
      return;
    }
  };

  const onCompleteSuccess = (index: number) => {
    const animatedSwipeProperty = taskRefs?.current?.[index];
    const method = shouldSwipeLeftRef.current
      ? animatedSwipeProperty?.slideLeft
      : animatedSwipeProperty?.slideRight;
    method(() =>
      setTasks((prev) => prev.filter((_, itemIndex) => itemIndex !== index))
    );
    shouldSwipeLeftRef.current = !shouldSwipeLeftRef.current;
  };

  return (
    <Fragment>
      <Loading loading={isLoading} />
      <FlatList
        data={tasks}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListEmptyComponent={<EmptyComponent />}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({ index, item }) => (
          <TodoListItem
            data={tasks}
            index={index}
            task={item}
            key={item.id}
            view={view}
            taskCheckBox={{
              task: item,
              view: view,
              isChecked: selectedTask.includes(item.id),
              isLoading: isTasklistLoading,
              onPress: () => handleTaskSelect(item),
              onCompleteSuccess: () => onCompleteSuccess(index),
            }}
            taskInput={{
              draggable: false,
              readonly: true,
              task: item,
            }}
            containerRef={(ref, index) =>
              (taskRefs.current = {
                ...taskRefs.current,
                [index]: ref,
              })
            }
            listContainer={AnimatedSwipe}
          />
        )}
      />
      {view !== TaskCheckView.COMPLETION_TOGGLE && !!selectedTask.length && (
        <Button className="mb-4" title="Done" onPress={handleDone} />
      )}
    </Fragment>
  );
};
