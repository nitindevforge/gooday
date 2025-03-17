import { TaskEntity, UserEntity } from "@gooday_corp/gooday-api-client";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useTaskUpdate } from "../../Data";
import { TaskInputBase } from "../TaskInputBase";
import { useReorderableDrag } from "react-native-reorderable-list";
import { TASK_LIST } from "../../Data/Constant";
import { useQueryClient } from "react-query";
import clsx from "clsx";

export interface TaskInputProps {
  task: TaskEntity;
  readonly?: boolean;
  setTodoHistory?: () => void;
  completed?: boolean;
  draggable?: boolean
}

export const TaskInput: React.FC<TaskInputProps> = ({
  task,
  readonly,
  setTodoHistory = () => { },
  completed,
  draggable = true
}) => {
  const tailwind = useTailwind();
  const { mutate } = useTaskUpdate();
  const [content, setContent] = useState(task.content);
  const inputRef = useRef<TextInput>(null);
  const drag = draggable ? useReorderableDrag() : () => { };
  const client = useQueryClient();

  useEffect(() => {
    setContent(task.content);
  }, [task.content]);

  const handleContentSubmit = () => {
    if (task.content === content) {
      return;
    }
    mutate(
      {
        id: task.id,
        data: {
          content,
        },
      },
      {
        onSuccess() {
          client.invalidateQueries(TASK_LIST);
          setTodoHistory();
        },
      }
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[tailwind("flex-row items-center"), { columnGap: 12 }]}
      onPress={() => inputRef.current?.focus()}
    >
      <TaskInputBase
        editable={!completed}
        value={content}
        ref={inputRef}
        onChangeText={setContent}
        readOnly={readonly}
        onSubmitEditing={handleContentSubmit}
        assignedTo={(task.assignedTo ?? []) as unknown as UserEntity[]}
        drag={draggable ? drag : null}
        className="h-auto"
        multiline
        blurOnSubmit
        textAlignVertical="center"
        style={[
          tailwind(
            clsx("h-auto py-2", {
              "text-gray-500": completed,
            })
          ),
          {
            minHeight: 30,
            maxHeight: 90
          },
          completed && {
            textDecorationLine: 'line-through'
          }
        ]}
        task={task}
      />
    </TouchableOpacity>
  );
};
