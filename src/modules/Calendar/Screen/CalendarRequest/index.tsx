import { Button, Icon, Typography } from "@app/ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import clsx from "clsx";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { CalendarNavigationParamList } from "../../Navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

export const CalendarRequestScreen = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<CalendarNavigationParamList>>();
  const { params } =
    useRoute<RouteProp<CalendarNavigationParamList, "CALENDAR_REQUEST">>();
  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={[tailwind("flex-1 items-center justify-center")]}>
        <View
          style={[
            tailwind(
              clsx(
                "flex items-center justify-center border-2 rounded-full bg-primary-200 border-primary-200"
              )
            ),
            {
              width: 124,
              height: 124,
            },
          ]}
        >
          <Icon name="check-mark" width={58} height={51} fill="white" />
        </View>
        <Typography
          variant="sm"
          weight="medium"
          className="w-[70%] text-center mt-10"
        >
          You have sent a requested to create a shared calendar with {params?.withMore || ''}.
        </Typography>
      </View>
      <View style={tailwind("px-6 mb-2")}>
        <Button title="Next" onPress={() => navigation.replace('CALENDAR_PAGE')} />
      </View>
    </SafeAreaView>
  );
};
