import React, { useCallback, useEffect, useRef, useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TaskInputBase } from "../TaskInputBase";
import { useTaskCreate } from "../../Data";
import { TodoEntity } from "@gooday_corp/gooday-api-client";
import { useTodoHistory } from "@app/common";

interface TaskCreateInputProps {
  todo: TodoEntity["id"];
  onSubmit: () => void;
  isTrailing: boolean;
  focus?: boolean
}

export const TaskCreateInput: React.FC<TaskCreateInputProps> = ({
  todo,
  onSubmit,
  isTrailing,
  focus
}) => {
  const tailwind = useTailwind();
  const { mutate } = useTaskCreate();
  const [content, setContent] = useState("");
  const { addTodoHistory } = useTodoHistory();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 500);
    }
  }, [focus]);

  const handleContentSubmit = useCallback(() => {
    if (content) {
      mutate(
        {
          content,
          todo,
        },
        {
          onSuccess: (data) => {
            setContent("");
            onSubmit();
            addTodoHistory({
              todoId: todo,
              tasks: [data.data.data],
              action: "CREATE",
            });
          },
        }
      );
    }
  }, [content]);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      handleContentSubmit();
    });

    return () => {
      hideSubscription.remove();
    };
  }, [content, Keyboard]);

  return (
    <View
      style={[tailwind("flex-row items-center relative"), { columnGap: 12 }]}
    >
      {isTrailing && (
        <View
          style={[
            tailwind("absolute bg-gray-600"),
            { width: 2, left: 13, bottom: -67, minHeight: 110 },
          ]}
        />
      )}
      <View
        style={[
          tailwind("h-7 w-7 border border-gray-600 rounded-full bg-white"),
        ]}
      />

      <TaskInputBase
        value={content}
        onChangeText={setContent}
        onBlur={() => {
          !content && onSubmit();
        }}
        onSubmitEditing={Keyboard.dismiss}
        placeholder="Add task"
        placeholderTextColor="black"
        // autoFocus
        className="mx-2 h-auto"
        multiline
        textAlignVertical="center"
        style={[tailwind('h-auto pb-2'), {
          minHeight: 30,
          maxHeight: 90
        }]}
        blurOnSubmit
        // onKeyPress={({ nativeEvent }) => {
        //   if (nativeEvent.key === 'Enter') {
        //     handleContentSubmit();
        //   }
        // }}
        ref={inputRef}
      />
    </View>
  );
};
