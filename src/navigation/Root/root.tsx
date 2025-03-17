import React, { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavigationParamList, SplashScreen } from "@app/navigation";
import { AuthNavigation, DailyBriefingChatScreen, DailyBriefingScreen, OnboardScreen } from "@app/modules";
import BottomTabsNavigation from "../BottomTabsNavigator";

const RootNavigationStack =
  createNativeStackNavigator<RootNavigationParamList>();

export const RootNavigation: React.FC = () => {
  return (
    <Fragment>
      <RootNavigationStack.Navigator screenOptions={{ headerShown: false }}>
        <RootNavigationStack.Screen name="SPLASH" component={SplashScreen} />
        <RootNavigationStack.Screen name="AUTH" component={AuthNavigation} />
        <RootNavigationStack.Screen
          name="APP"
          component={BottomTabsNavigation}
        />
        <RootNavigationStack.Screen
          name="DAILY_BRIEFING"
          options={{ gestureEnabled: false }}
          component={() => <DailyBriefingScreen showNextButton={true} />}
        />
        <RootNavigationStack.Screen
          name="DAILY_BRIEFING_CHAT"
          options={{ gestureEnabled: false }}
          component={() => <DailyBriefingChatScreen showNextButton={true} />}
        />
        <RootNavigationStack.Screen
          options={{ gestureEnabled: false }}
          name="ON_BOARD" component={OnboardScreen}
        />
      </RootNavigationStack.Navigator>
    </Fragment>
  );
};
