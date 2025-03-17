import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { TodoNavigationStackParamList, useActiveTodo } from "../..";
import { TouchableOpacity, ViewStyle } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";

export const TaskHeader: FC<{ header?: string,style?: ViewStyle }> = ({ header,style }) => {
  const tailwind = useTailwind();
  const { activeTodo } = useActiveTodo();
  const navigation =
    useNavigation<NativeStackNavigationProp<TodoNavigationStackParamList>>();

  return (
    <TouchableOpacity
      style={[tailwind("flex-row items-center mt-4"), { gap: 8 },style]}
      activeOpacity={0.8}
      onPress={navigation.goBack}
    >
      <Icon name="back" height={18} width={18} />
      <Typography weight="medium" variant="xl">
        {header || activeTodo?.name}
      </Typography>
    </TouchableOpacity>
  );
};
