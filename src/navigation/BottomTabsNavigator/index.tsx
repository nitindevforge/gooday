import {
  CalendarNavigation,
  DailyBriefingChatScreen,
  HomeNavigation,
  ProfileNavigation,
  TodoNavigation,
} from "@app/modules";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabsNavigatorList } from "./type";
import CustomTabBar from "../CustomTabBar";

const Tab = createBottomTabNavigator<BottomTabsNavigatorList>();

const BottomTabsNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      id="APP"
      initialRouteName="HOME"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HOME" component={HomeNavigation} />
      <Tab.Screen name="TODO" component={TodoNavigation} />
      <Tab.Screen name="CALENDAR" component={CalendarNavigation} />
      <Tab.Screen name="BRIEFING" component={() => <DailyBriefingChatScreen showNextButton={false} />} />
      <Tab.Screen name="PROFILE" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigation;
