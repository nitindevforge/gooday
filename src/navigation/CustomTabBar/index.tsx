import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { Icon } from "@app/ui";
import { BottomTabsNavigatorList } from "../BottomTabsNavigator/type";
import { Icons } from "src/ui/Icon/type";
import { useBottomVarVariant, useCalendar } from "@app/common";
import clsx from "clsx";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const tailwind = useTailwind();
  const { bottomVarVariant } = useBottomVarVariant();
  const { setCalenderType } = useCalendar();

  const TabMapping: Record<
    keyof BottomTabsNavigatorList,
    {
      icon: Icons;
    }
  > = {
    HOME: {
      icon: "home",
    },
    TODO: {
      icon: "todo",
    },
    CALENDAR: {
      icon: "calendar",
    },
    BRIEFING: {
      icon: "note",
    },
    PROFILE: {
      icon: "profile",
    },
  };

  return (
    <View style={tailwind("bg-white")}>
      <View
        style={tailwind(
          clsx("bg-gray-700", {
            "rounded-t-2.5xl": bottomVarVariant === "rounded",
          })
        )}
      >
        <View style={tailwind("flex-row")}>
          {state.routes.map((route, index) => {
            const tab = TabMapping[route.name as keyof BottomTabsNavigatorList];
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true } as any);
              }
              if (route?.name === "CALENDAR") {
                setCalenderType("month");
              }
            };
            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };
            return (
              <TouchableOpacity
                style={tailwind(
                  "pt-4 pb-5 mb-3 flex-1 items-center justify-center"
                )}
                accessibilityRole="button"
                key={route.key}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <Icon
                  outline={!isFocused}
                  name={tab.icon}
                  width={24}
                  height={24}
                  stroke="none"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CustomTabBar;
