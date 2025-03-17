import React, { FC } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TodoListItemProps } from "./type";
import clsx from "clsx";
import { TaskCheckbox } from "../TaskCheckbox";
import { TaskInput } from "../TaskInput";

export const TodoListItem: FC<TodoListItemProps> = ({
  task,
  view,
  data = [],
  index,
  taskCheckBox,
  taskInput,
  listContainer,
  containerRef,
}) => {
  const tailwind = useTailwind();
  const Container: any = listContainer ? listContainer : View;
  return (
    <Container
      ref={(ref: any) => containerRef?.(ref, index)}
      style={tailwind("flex-row px-1 items-center")}
    >
      <View style={tailwind("pr-4 relative")}>
        {data.length - 1 !== index && (
          <View
            style={[
              tailwind(
                clsx("bg-gray-600 flex-1 absolute h-full bottom-0 left-1/2")
              ),
              { marginLeft: -2, top: 10, width: 2 },
              {
                minHeight: 105,
              },
            ]}
          ></View>
        )}
        <View style={{ marginVertical: 10, marginLeft: -3 }}>
          <TaskCheckbox view={view} task={task} {...taskCheckBox} />
        </View>
      </View>
      <View style={[tailwind("flex-1"), { paddingVertical: 10 }]}>
        <TaskInput task={task} {...taskInput} />
      </View>
    </Container>
  );
};
