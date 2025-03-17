import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { DropdownItemProps } from "./type";
import { Icon, Typography } from "@app/ui";
import clsx from "clsx";

export const DropdownItem: React.FC<DropdownItemProps> = ({
  data,
  variant,
  children,
  onClose,
  styles,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind("bg-white w-full rounded-t-3xl"),
        { maxHeight: 550 },
        styles,
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={[
          tailwind("bg-gray-400 h-1.5 rounded-3xl m-auto mt-2"),
          { width: 67 },
        ]}
      />
      <FlatList
        style={[
          tailwind(
            clsx("mb-2 mt-4", {
              "mb-10": !children,
            })
          ),
          {},
        ]}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              disabled={item?.disabled}
              onPress={() => {
                item?.onPress?.();
                onClose();
              }}
              activeOpacity={0.7}
              style={[
                tailwind(
                  clsx(`border-gray-600 flex-row px-6 py-4 items-center`, {
                    "justify-between": variant === "between",
                    "rounded-t-3xl": index === 0,
                  })
                ),
                {
                  borderBottomWidth:
                    data[data?.length - 1]?.label === item?.label ? 0 : 1,
                  gap: 14,
                },
              ]}
            >
              {variant !== "between" && (
                <View style={{ width: 20, alignItems: "center" }}>
                  <Icon {...item?.icon} />
                </View>
              )}
              <Typography
                className="flex-1"
                variant="sm"
                color={item?.textColor}
              >
                {item?.label}
              </Typography>
              {variant === "between" && <Icon {...item?.icon} />}
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => (children ? children : <View />)}
        keyExtractor={(_, index) => index?.toString()}
      />
    </View>
  );
};
