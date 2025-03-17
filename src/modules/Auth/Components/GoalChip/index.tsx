import React from "react";
import { TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { GoalChipProps } from "./type";
import { Typography } from "@app/ui";
import clsx from "clsx";

const GoalChip: React.FC<GoalChipProps> = ({ goal, checked, onPress }) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        borderWidth: 1.5,
        ...tailwind(
          clsx(
            "border-gray-600 flex-row items-center justify-center h-11 rounded-xl px-4",
            {
              "border-gray-200": checked,
            }
          )
        ),
      }}
    >
      <Typography weight="medium" variant="sm">
        {goal}
      </Typography>
    </TouchableOpacity>
  );
};

export default GoalChip;
