import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ConsentCheckboxProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { Typography } from "@app/ui";
import clsx from "clsx";

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({
  title,
  onPress,
  checked,
}) => {
  const tailwind = useTailwind();
  const typeOfTitle = typeof title;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ gap: 15, ...tailwind("flex-row w-full items-start justify-start") }}
    >
      <View
        style={{
          borderWidth: checked ? 4 : 1,
          ...tailwind(
            clsx("w-4 h-4 border-gray-500 rounded-full mt-1", {
              "border-primary-300": checked,
            })
          ),
        }}
      ></View>
      {!!title &&
        (typeOfTitle === "string" ? <Typography className="flex-shrink">{title}</Typography> : title)}
    </TouchableOpacity>
  );
};

export default ConsentCheckbox;
