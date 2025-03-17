import { AppLogo } from "@app/components";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ProfileHeaderProps } from "./type";
import { Icon, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ header }) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabsNavigatorList>>();
  return (
    <View style={tailwind("px-6 py-4 flex-row justify-between items-center")}>
      <View style={[tailwind("flex-row flex-1 items-center"), { rowGap: 10 }]}>
        <TouchableOpacity
          style={tailwind("flex items-start w-7 justify-center")}
          onPress={() => navigation?.goBack()}
          hitSlop={24}
        >
          <Icon
            fill="#2E2E2E"
            name="back"
            stroke="none"
            width={10}
            height={20}
          />
        </TouchableOpacity>
        <Typography
          variant="2xl"
          color="black"
          weight="medium"
          className="flex-1"
        >
          {header}
        </Typography>
      </View>

      <AppLogo />
    </View>
  );
};
