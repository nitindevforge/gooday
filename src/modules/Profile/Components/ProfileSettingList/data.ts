import { NavigationLinkItem } from "@app/components";
import { ProfileNavigationStackParamList } from "../../Navigation/type";

export const ProfileSettingItems: (Pick<
  NavigationLinkItem,
  "icon" | "label" | "color" | "iconProps"
> & { screen: keyof ProfileNavigationStackParamList })[] = [
    {
      label: "Location Settings",
      icon: "location",
      screen: "LOCATION_SETTING",
      color: '#2F4B93',
    },
    {
      label: "Notifications",
      icon: "notification",
      screen: "NOTIFICATION_SETTING",
      color: '#2F4B93'
    },
    {
      label: "Account",
      icon: "lock",
      screen: "ACCOUNT",
      color: '#2F4B93'
    },
    {
      label: "Terms and Conditions",
      icon: "info-line",
      screen: "TERMS_AND_CONDITION",
      color: '#2F4B93'
    },
    {
      label: "Change Personal Assistant",
      icon: "swap",
      screen: "CHANGE_PERSONAL_ASSISTANT",
      color: '#2F4B93'
    },
    {
      label: "Profile and Privacy",
      icon: "profile-policy",
      screen: "PROFILE_AND_PRIVACY",
      color: '#2F4B93',
      iconProps: {
        fill: 'none',
        stroke: "2F4B93"
      }
    },
    {
      label: "Help Center",
      icon: "help",
      screen: "HELP_CENTER",
      color: '#2F4B93'
    },
    {
      label: "Feedback",
      icon: "feedback",
      screen: "FEEDBACK",
      color: '#2F4B93'
    },
  ];
