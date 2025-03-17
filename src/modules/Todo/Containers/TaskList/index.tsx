import React, { Fragment, useEffect, useRef, useState } from "react";
import { useActiveTodo } from "../../Hooks";
import {
  Alert,
  Keyboard,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  AvatarGroup,
  Button,
  EmptyComponent,
  Icon,
  ListTracker,
  Loading,
} from "@app/ui";
import { useTailwind } from "tailwind-rn";
import {
  EditableTodoInput,
  TaskCheckbox,
  TaskCreateInput,
  TaskInput,
} from "../../Components";
import { TaskEntity } from "@gooday_corp/gooday-api-client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  MY_FRIENDS_TASK_LIST,
  MY_TASK_LIST,
  TASK_LIST,
  TodoNavigationStackParamList,
  useTaskUpdate,
} from "../..";
import {
  DropdownIconModal,
  HomeNavigationParamList,
  useTaskDelete,
  useTaskList,
  useTaskReorder,
} from "@app/modules";
import { ReorderableListReorderEvent } from "react-native-reorderable-list";
import { useTodoHistory } from "@app/common";
import { getAssetUrl } from "@app/utils";
import {
  AnimatedSwipe,
  AnimatedSwipeProperties,
} from "../../Components/AnimatedSwipe";
import { TaskCheckView } from "../../Components/TaskCheckbox/type";
import { queryClient } from "../../../../index";

export const TaskListContainer = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        TodoNavigationStackParamList & HomeNavigationParamList
      >
    >();

  const [view, setView] = useState<TaskCheckView>(
    TaskCheckView.COMPLETION_TOGGLE
  );

  const { activeTodo } = useActiveTodo();
  const {
    data,
    isLoading: isTasklistLoading,
    isSuccess,
    isRefetching,
    refetch: refetchTaskList,
  } = useTaskList({
    todo: activeTodo?.id ?? "",
    isDeleted: false,
  });
  const { mutate: reorder, isLoading: isReorderingTodo } = useTaskReorder();
  const { mutate, isLoading: isDeletingTask } = useTaskDelete();
  const { mutate: updateTask, isLoading: isUpdateLoading } = useTaskUpdate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const { todoHistory, addTodoHistory, onUndo } = useTodoHistory();
  const [focus, setFocus] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [createInputFocus, setCreateInputFocus] = useState<boolean>(false);

  const taskRefs = useRef<Record<number, AnimatedSwipeProperties>>({});
  const shouldSwipeLeftRef = useRef<boolean>(true);

  useEffect(() => {
    setTasks(
      data?.data?.data?.filter(
        (task) => task?.status !== "COMPLETED"
      ) as TaskEntity[]
    );
  }, [data?.data?.data]);
  const isLoading =
    isTasklistLoading || isReorderingTodo || isDeletingTask || isRefetching;

  const [selectedTask, setSelectedTask] = useState<TaskEntity["id"][]>([]);

  useEffect(() => {
    if (!isLoading && !data?.data?.data?.length && isSuccess) {
      setCreateOpen(true);
    } else {
      setCreateOpen(false);
    }
  }, [isLoading, data?.data?.data, isSuccess]);

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
    const deletedTask = tasks?.filter((el) => selectedTask?.includes(el?.id));
    selectedTask.map((id, index) =>
      mutate(id, {
        onSuccess: () => {
          setSelectedTask((prev) => prev.filter((el) => el !== id));
          if (index === selectedTask?.length - 1) {
            addTodoHistory({
              action: "DELETE",
              tasks: deletedTask,
              todoId: activeTodo?.id!,
            });
          }
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

  const addToUrgentTask = () => {
    const urgent: string[] =
      data?.data?.data
        .filter((el) => el.urgent && !selectedTask.includes(el.id))
        .map((el) => el.id) || [];
    const updateUrgent = [...urgent, ...selectedTask];
    updateUrgent.map((id, index) =>
      updateTask(
        {
          data: {
            urgent: urgent?.includes(id) ? false : true,
          },
          id,
        },
        {
          onSuccess: () => {
            if (updateUrgent.length - 1 === index) {
              queryClient.invalidateQueries(TASK_LIST);
              queryClient.invalidateQueries(MY_FRIENDS_TASK_LIST);
              queryClient.invalidateQueries(MY_TASK_LIST);
            }
          },
        }
      )
    );
  };

  const handleDone = () => {
    setView(TaskCheckView.COMPLETION_TOGGLE);

    if (view === TaskCheckView.SELECTABLE) {
      handleSendTask();
      return;
    }
    if (view === TaskCheckView.URGENT) {
      addToUrgentTask();
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

  const handleReorder = (event: ReorderableListReorderEvent) => {
    const [movedItem] = tasks.splice(event.from, 1);

    tasks.splice(event.to, 0, movedItem);

    const newTask = tasks.map((item, index) => ({
      ...item,
      position: index + 1,
    }));
    if (movedItem?.id) {
      reorder({
        id: movedItem?.id,
        update: newTask,
      });
    }
  };

  const setTodoHistory = (tasks: any) => {
    addTodoHistory({
      action: "UPDATE",
      tasks,
      todoId: activeTodo?.id,
    });
  };

  const todoOptions = [
    todoHistory?.length && {
      label: "Undo",
      icon: {
        name: "count-down",
        height: 16,
        width: 16,
        stroke: "none",
      },
      onPress: onUndo,
      textColor: "black",
    },
    {
      label: "Urgent",
      icon: {
        name: "exclamation",
        outline: false,
        width: 20,
        height: 20,
        fill: "black",
        stroke: "none",
      },
      onPress: () => setView(TaskCheckView.URGENT),
      textColor: "black",
    },
    {
      label: "Rename To-Do List",
      icon: {
        name: "edit",
        outline: false,
        width: 16,
        height: 16,
        fill: "black",
        stroke: "none",
      },
      onPress: () => setFocus(true),
      textColor: "black",
    },
    {
      label: "Send Tasks",
      icon: {
        name: "export",
        height: 16,
        width: 16,
        stroke: "none",
      },
      onPress: () => {
        setView((prev) =>
          prev === TaskCheckView.SELECTABLE
            ? TaskCheckView.COMPLETION_TOGGLE
            : TaskCheckView.SELECTABLE
        );
      },
      textColor: "black",
    },
    {
      label: "Show Completed",
      icon: {
        name: "count-down",
        height: 16,
        width: 16,
        stroke: "none",
      },
      onPress: () => {
        navigation.navigate("TASK_LIST");
      },
      textColor: "black",
    },
    activeTodo?.type !== "PRIMARY" && {
      label: "Share List",
      icon: {
        name: "swap",
        height: 16,
        width: 16,
        stroke: "none",
        round: false,
      },
      onPress: () => navigation.navigate("TODO_COLLABORATOR"),
      textColor: "black",
    },
    {
      label: "Delete Tasks",
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

  useEffect(() => {
    setView(TaskCheckView.COMPLETION_TOGGLE);
    setMenuOpen(false);
    setCreateOpen(false);
    setSelectedTask([]);
    setFocus(false);
  }, [activeTodo]);

  useEffect(() => {
    if (view === TaskCheckView.URGENT) {
      setSelectedTask(
        tasks?.filter((task) => task?.urgent && task.id).map((el) => el.id)
      );
    }
  }, [view]);

  return (
    <Fragment>
      <Loading loading={isLoading} />
      {!activeTodo?.id ? (
        <EmptyComponent massage="No active todo!" />
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tailwind("flex-1")}>
            <View style={tailwind("flex-row items-center pl-0.5")}>
              <TouchableOpacity
                style={tailwind("flex items-start w-7 h-11 justify-center")}
                onPress={navigation.goBack}
              >
                <Icon
                  fill="#2E2E2E"
                  name="back"
                  stroke="none"
                  width={10}
                  height={20}
                />
              </TouchableOpacity>
              <View style={tailwind("pl-2")}>
                <EditableTodoInput
                  todo={activeTodo}
                  focus={focus}
                  setFocus={setFocus}
                />
              </View>
              <View
                style={[
                  tailwind("flex-row items-center flex-1 justify-end"),
                  { gap: 12 },
                ]}
              >
                <AvatarGroup
                  avatars={activeTodo?.collaborators?.map((el) =>
                    getAssetUrl(el?.user?.profile)
                  )}
                />
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
            <View style={tailwind("flex-1 relative")}>
              <View style={[tailwind("mt-6 flex-1"), { gap: 12 }]}>
                {isCreateOpen && (
                  <TaskCreateInput
                    todo={activeTodo?.id}
                    onSubmit={() => setCreateOpen(false)}
                    isTrailing={!!tasks.length}
                    focus={createInputFocus}
                  />
                )}
                <ListTracker<TaskEntity>
                  containerRef={(ref, index) =>
                  (taskRefs.current = {
                    ...taskRefs.current,
                    [index]: ref,
                  })
                  }
                  listContainer={AnimatedSwipe}
                  data={tasks}
                  alignment="center"
                  onReorder={handleReorder}
                  keyExtractor={(task) => task.id}
                  scrollEnabled={!isCreateOpen}
                  lineStyle={{
                    minHeight: 105,
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefetching}
                      onRefresh={refetchTaskList}
                    />
                  }
                  renderItem={(task) => (
                    <TaskInput
                      task={task}
                      key={task.id}
                      setTodoHistory={() => setTodoHistory([task])}
                      completed={task?.status === "COMPLETED"}
                    />
                  )}
                  renderSeparator={(task, index) => (
                    <TaskCheckbox
                      task={task}
                      view={view}
                      isChecked={selectedTask.includes(task.id)}
                      isLoading={false}
                      onLongPress={() => setView(TaskCheckView.DELETABLE)}
                      onPress={() => {
                        if (
                          view === TaskCheckView.SELECTABLE ||
                          view === TaskCheckView.DELETABLE ||
                          view === TaskCheckView.URGENT
                        ) {
                          handleTaskSelect(task);
                          return;
                        }
                      }}
                      onCompleteSuccess={() => {
                        const animatedSwipeProperty =
                          taskRefs?.current?.[index];
                        const method = shouldSwipeLeftRef.current
                          ? animatedSwipeProperty?.slideLeft
                          : animatedSwipeProperty?.slideRight;
                        method(() =>
                          setTasks((prev) =>
                            prev.filter((_, itemIndex) => itemIndex !== index)
                          )
                        );
                        shouldSwipeLeftRef.current =
                          !shouldSwipeLeftRef.current;
                      }}
                      setTodoHistory={() => setTodoHistory([task])}
                    />
                  )}
                  gap={10}
                />
              </View>
              {view === TaskCheckView.COMPLETION_TOGGLE && (
                <TouchableOpacity
                  activeOpacity={1}
                  style={tailwind(
                    "bg-white absolute right-0 bottom-6 rounded-full"
                  )}
                  onPress={() => {
                    setCreateOpen((prev) => !prev);
                    setCreateInputFocus(true);
                  }}
                >
                  {isCreateOpen ? (
                    <View
                      style={tailwind("border border-black rounded-full p-2")}
                    >
                      <Icon name="close" stroke="none" width={30} height={30} />
                    </View>
                  ) : (
                    <Icon name="plus" stroke="none" width={60} height={60} />
                  )}
                </TouchableOpacity>
              )}
            </View>

            {view !== TaskCheckView.COMPLETION_TOGGLE &&
              !!selectedTask.length && (
                <Button className="mb-4" title="Done" onPress={handleDone} />
              )}
          </View>
        </TouchableWithoutFeedback>
      )}
    </Fragment>
  );
};
