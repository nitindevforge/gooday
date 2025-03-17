import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TodoItemListProps } from "./type";
import { Icon, Typography } from "@app/ui";

export const TodoItemList: FC<TodoItemListProps> = ({
  icon,
  name,
  onPress,
  style,
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        tailwind(
          "rounded-2xl border border-gray-600 mb-3 overflow-hidden"
        ),
      ]}
    >
      <View
        style={tailwind(
          "flex-row items-center justify-between px-6 py-3"
        )}
      >
        <View
          style={[tailwind("flex-row items-center"), { gap: 22 }]}
        >
          <TouchableOpacity
            onPress={() => { }}
            style={[
              tailwind(
                "h-7 w-7 rounded-full bg-white flex items-center justify-center"
              ), style
            ]}
            activeOpacity={1}
          >
            {icon}
          </TouchableOpacity>
          <Typography variant="15">
            {name}
          </Typography>
        </View>
        <Icon
          name="chevron"
          fill="#DADADA"
        />
      </View>
    </TouchableOpacity>
  );
};