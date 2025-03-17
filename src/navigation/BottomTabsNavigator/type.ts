import { ProfileNavigationStackParamList } from "@app/modules";

export type BottomTabsNavigatorList = {
  HOME: undefined;
  TODO: undefined;
  BRIEFING: { showNextButton: boolean };
  CALENDAR: undefined;
  PROFILE: { screen: keyof ProfileNavigationStackParamList };
};
