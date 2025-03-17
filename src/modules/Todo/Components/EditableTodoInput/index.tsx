import { TodoEntity } from "@gooday_corp/gooday-api-client";
import React, { useEffect, useRef, useState } from "react";
import { useUpdateTodo } from "../../Data";
import { TextInput, TextInputProps } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useActiveTodo } from "../../Hooks";
interface EditableTodoInputProps extends TextInputProps {
  todo: TodoEntity;
  focus?: boolean;
  setFocus?: (focus: boolean) => void;
}

export const EditableTodoInput: React.FC<EditableTodoInputProps> = ({
  todo,
  focus,
  setFocus = () => {},
  ...rest
}) => {
  const tailwind = useTailwind();
  const { setActiveTodo } = useActiveTodo();
  const { mutate } = useUpdateTodo();
  const [name, setName] = useState(todo?.name);
  const [isFocused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setName(todo.name);
  }, [todo.name]);

  const handleSubmit = () => {
    if(name?.trimStart()){
      mutate(
        {
          id: todo.id,
          data: {
            name,
          },
        },
        {
          onSuccess(data) {
            setActiveTodo(data.data.data);
            setFocus(false);
            setFocused(false)
          },
        }
      );
    }
  };

  useEffect(() => {
    if (focus) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 500);
    }
  }, [focus]);

  return (
    <TextInput
      value={name}
      style={[
        { fontSize: 24 },
        isFocused && tailwind("border w-auto border-blue-primary"),
      ]}
      onChangeText={setName}
      returnKeyType="done"
      onBlur={() => handleSubmit()}
      onFocus={() => setFocused(true)}
      onSubmitEditing={handleSubmit}
      ref={inputRef}
      {...rest}
    />
  );
};
