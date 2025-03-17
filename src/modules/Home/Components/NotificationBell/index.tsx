import React, { FC } from "react";
import { Icon } from "@app/ui";
import { TouchableOpacity, View } from "react-native";
import { NotificationBellProps } from "./type";

export const NotificationBell: FC<NotificationBellProps> = ({
  onNotificationNavigate,
  darkHeader,
  notification = false,
  size = 24,
  stroke,
}) => {
  return (
    <TouchableOpacity
      hitSlop={6}
      onPress={onNotificationNavigate}>
      <Icon
        name={notification ? "notification-bell" : "bell"}
        width={size}
        height={size}
        stroke={stroke || undefined}
        fill={darkHeader ? "white" : "black"}
      />
    </TouchableOpacity>
  );
};
