import React, { FC } from "react";
import { EmptyComponentProps } from "./type";
import { View } from "react-native";
import Typography from "../Typography";
import { useTailwind } from "tailwind-rn";

export const EmptyComponent: FC<EmptyComponentProps> = ({
  massage,
  style,
  children: Children,
}) => {
  const tailwind = useTailwind();
  return (
    <View
      style={[tailwind("flex-1 items-center justify-center w-full"), style]}
    >
      {Children ? (
        <Children />
      ) : (
        <Typography>{massage || "No data found!"}</Typography>
      )}
    </View>
  );
};
