import React from "react";
import { TabBarProps } from "@app/modules";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Typography } from "@app/ui";

export const TabBar: React.FC<TabBarProps> = ({
  onPress,
  active,
  tabs,
  contentWrapperStyle,
  renderItem: RenderItem,
  tabStyle,
}) => {
  const tailwind = useTailwind();

  const onTabChange = (name: string) => {
    onPress(name);
  };

  return (
    <View
      style={[tailwind("flex-row justify-around w-full"), contentWrapperStyle]}
    >
      {tabs?.map((tab) => (
        <TouchableOpacity
          key={tab?.value}
          style={[tabStyle]}
          activeOpacity={0.7}
          onPress={() => onTabChange(tab?.value)}
        >
          {RenderItem ? (
            <RenderItem {...tab}/>
          ) : (
            <View
              style={{
                borderBottomWidth: active === tab?.value ? 2 : 0,
                paddingHorizontal: 24,
                paddingBottom: 4,
              }}
            >
              <Typography
                variant="xl"
                weight={active === tab?.value ? "medium" : "light"}
              >
                {tab?.label}
              </Typography>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
