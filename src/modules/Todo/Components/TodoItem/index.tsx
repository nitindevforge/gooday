import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import { useTailwind } from "tailwind-rn";
import { TodoItemProps } from "./type";
import { Icon } from "@app/ui";

export const TotoItem: FC<TodoItemProps> = ({
  onDeletePress,
  translation,
  onEditToto,
  todo,
}) => {
  const tailwind = useTailwind();

  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translation.value + (todo?.type === "PRIMARY" ? 56 : 112),
        },
      ],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View
        style={[
          tailwind("flex-row items-center"),
          {
            width: todo?.type === "PRIMARY" ? 56 : 112,
            height: "100%",
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onEditToto}
          style={[
            tailwind("bg-primary-100 flex items-center justify-center"),
            {
              width: 56,
              height: "100%",
            },
          ]}
        >
          <Icon
            name="edit"
            outline={false}
            width={16}
            height={16}
            fill="white"
            stroke="none"
          />
        </TouchableOpacity>
        {todo?.type !== "PRIMARY" && (
          <TouchableOpacity
            onPress={onDeletePress}
            activeOpacity={1}
            style={[
              tailwind(
                "bg-error rounded-r-2xl flex items-center justify-center"
              ),
              {
                width: 56,
                height: "100%",
              },
            ]}
          >
            <Icon name="delete" width={20} height={20} fill="white" />
          </TouchableOpacity>
        )}
      </View>
    </Reanimated.View>
  );
};
