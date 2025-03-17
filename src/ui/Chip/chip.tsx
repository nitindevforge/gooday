import React from "react";
import { useTailwind } from "tailwind-rn";
import { TouchableOpacity } from "react-native";
import { ChipProps, Icon, Typography } from "@app/ui";
import clsx from "clsx";

export const Chip: React.FC<ChipProps> = ({
  onPress,
  label,
  background,
  textColor,
  variant = "primary",
  styles,
  rightIcon: RightIcon,
}) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        tailwind(
          clsx(
            `w-auto flex-row rounded-lg justify-center items-center px-2.5 ${background}`,
            {
              "border-dashed border-gray-400": variant === "dashed",
            }
          )
        ),
        {
          borderWidth: variant === "dashed" ? 1 : 0,
          height: 30,
        },
        styles,
      ]}
    >
      <Typography variant="sm" color={textColor} weight="medium">
        {label}
      </Typography>
      {RightIcon && <RightIcon />}
    </TouchableOpacity>
  );
};
