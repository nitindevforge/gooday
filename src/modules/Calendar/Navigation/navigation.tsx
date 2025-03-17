import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Fragment } from "react";
import { CalendarNavigationParamList } from "./type";
import {
  CalendarRequestScreen,
  CalendarScreen,
  CollaboratorScreen,
  NotificationCalendarScreen,
  PoliciesScreen,
} from "@app/modules";

const CalendarNavigationStack =
  createNativeStackNavigator<CalendarNavigationParamList>();

export const CalendarNavigation = () => {
  return (
    <Fragment>
      <CalendarNavigationStack.Navigator screenOptions={{ headerShown: false }}>
        <CalendarNavigationStack.Screen
          name="CALENDAR_PAGE"
          component={CalendarScreen}
        />
        <CalendarNavigationStack.Screen
          name="COLLABORATOR"
          component={CollaboratorScreen}
        />
        <CalendarNavigationStack.Screen
          name="CALENDAR_REQUEST"
          component={CalendarRequestScreen}
        />
        <CalendarNavigationStack.Screen
          name="NOTIFICATIONS"
          component={NotificationCalendarScreen}
        />
        <CalendarNavigationStack.Screen name="POLICY" component={PoliciesScreen} />
      </CalendarNavigationStack.Navigator>
    </Fragment>
  );
};
