import { Typography } from "@app/ui";
import React from "react";
import { Switch, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { PermissionToggleProps } from "./type";

export const PermissionToggle: React.FC<PermissionToggleProps> = ({
  label,
  value,
  isEnabled,
  onChange,
  hideToggle = false,
}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("flex-row justify-between items-center")}>
      <View>
        <Typography variant="xl" weight="medium">
          {label}
        </Typography>
        {!!value && <Typography variant="base">{value}</Typography>}
      </View>
      {!hideToggle && (
        <Switch
          trackColor={{
            true: "#233679",
          }}
          value={isEnabled}
          onValueChange={onChange}
        />
      )}
    </View>
  );
};
