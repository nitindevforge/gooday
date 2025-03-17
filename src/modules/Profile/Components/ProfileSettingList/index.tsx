import React from "react";
import { View } from "react-native";
import { ProfileSettingItems } from "./data";
import { NavigationLink } from "@app/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileNavigationStackParamList } from "../../Navigation/type";
export const ProfileSettingList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileNavigationStackParamList>>();
  return (
    <View style={{ gap: 30 }}>
      {ProfileSettingItems.map((element) => (
        <NavigationLink
          key={element.label}
          icon={element.icon}
          color={element.color}
          label={element.label}
          iconProps={element.iconProps}
          onNavigate={() => navigation.navigate(element.screen)}
        />
      ))}
    </View>
  );
};
