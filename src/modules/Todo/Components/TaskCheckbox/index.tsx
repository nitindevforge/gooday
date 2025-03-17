import { Icon } from "@app/ui";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useTaskUpdate } from "../../Data";
import { useQueryClient } from "react-query";
import { MY_FRIENDS_TASK_LIST, MY_TASK_LIST, TASK_LIST } from "../../Data/Constant";
import { TaskCheckboxProps, TaskCheckView } from "./type";

export const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  task,
  view,
  isChecked,
  isLoading: isRefreshing,
  onPress,
  setTodoHistory = () => { },
  onLongPress,
  onCompleteSuccess
}) => {
  const tailwind = useTailwind();
  const { mutate, isLoading } = useTaskUpdate();
  const client = useQueryClient();
  const handleTaskStatusUpdate = async () => {
    mutate(
      {
        data: {
          status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
        },
        id: task.id,
      },
      {
        onSuccess: () => {
          setTodoHistory()
          if (task.status === "COMPLETED") {
            client.invalidateQueries(TASK_LIST);
            client.invalidateQueries(MY_FRIENDS_TASK_LIST);
            client.invalidateQueries(MY_TASK_LIST);
          } else {
            onCompleteSuccess?.()
          }
        },
      }
    );
  };

  const isSelected =
    view === TaskCheckView.COMPLETION_TOGGLE
      ? task.status === "COMPLETED"
      : isChecked;

  if (isLoading || isRefreshing) {
    return (
      <View
        style={[
          tailwind(
            "h-7 w-7 border border-gray-600 rounded-full bg-white flex items-center justify-center"
          ),
        ]}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (view === TaskCheckView.COMPLETION_TOGGLE) {
    return (
      <TouchableOpacity
        onPress={handleTaskStatusUpdate}
        onLongPress={onLongPress}
        disabled={isLoading}
        style={[
          tailwind(
            "h-7 w-7 rounded-full bg-white flex items-center justify-center"
          ),
          isSelected
            ? tailwind("border border-primary-200 bg-primary-200")
            : tailwind("border border-gray-600"),
        ]}
        activeOpacity={1}
      >
        {isSelected && (
          <Icon
            name="check"
            stroke="#FECB4D"
            fill="white"
            height={16}
            width={16}
          />
        )}
      </TouchableOpacity>
    );
  }

  if (view === TaskCheckView.SELECTABLE || view === TaskCheckView.URGENT || view === TaskCheckView.RESTORE) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isLoading}
        style={[
          tailwind(
            "h-7 w-7 rounded-full bg-white flex items-center justify-center"
          ),
          isSelected
            ? tailwind("border border-blue-primary bg-blue-primary")
            : tailwind("border-2 border-blue-primary"),
        ]}
        activeOpacity={1}
      >
        {isSelected && (
          <View
            style={tailwind(
              "h-6 w-6 bg-white rounded-full border-white border-4 bg-blue-primary"
            )}
          />
        )}
      </TouchableOpacity>
    );
  }

  if (view === TaskCheckView.DELETABLE) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isLoading}
        style={[
          tailwind(
            "h-7 w-7 rounded-full bg-white flex items-center justify-center"
          ),
          isSelected
            ? tailwind("border border-secondary-500 bg-secondary-500")
            : tailwind("border border-secondary-500"),
        ]}
        activeOpacity={1}
      >
        {isSelected && (
          <View
            style={tailwind(
              "h-6 w-6 bg-white rounded-full border-white border-4 bg-secondary-500"
            )}
          />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[tailwind("h-7 w-7 border border-gray-600 rounded-full bg-white")]}
    />
  );
};
