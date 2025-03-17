import { Icon, Typography } from "@app/ui";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { NavigationLinkItem } from "./type";

export const NavigationLink: React.FC<NavigationLinkItem> = ({
  icon,
  label,
  value,
  helperText,
  color,
  onNavigate,
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      key={label}
      onPress={onNavigate}
      disabled={!onNavigate}
      style={tailwind("flex-row justify-between items-center")}
    >
      <View style={tailwind("flex-row items-center flex-1")}>
        {!!icon && <Icon name={icon} fill={color} style={tailwind("mr-2")} />}
        <View>
          <Typography variant="xl" weight="medium">
            {label}
          </Typography>
          {!!value && <Typography variant="base">{value}</Typography>}
          {!!helperText && <Typography variant="base">{helperText}</Typography>}
        </View>
      </View>
      {!!onNavigate && <Icon width={10} height={16} name="chevron" fill="#2E2E2E" />}
    </TouchableOpacity>
  );
};
