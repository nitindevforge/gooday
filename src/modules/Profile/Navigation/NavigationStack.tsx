import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ProfileNavigationStackParamList } from "./type";
import {
  AccountSettingScreen,
  ChangePasswordScreen,
  ChangePersonalAssistantScreen,
  DeactivateAccountScreen,
  FeedbackScreen,
  FriendDetailsScreen,
  HelpCenterScreen,
  LocationSettingScreen,
  ManageSubscriptionScreen,
  NotificationScreen,
  NotificationSettingScreen,
  PrivacyPolicyScreen,
  ProfilePrivacyScreen,
  ProfileScreen,
  ProfileSettingScreen,
  QRCodeScreen,
  SyncCalendarScreen,
  TermsConditionScreen,
} from "@app/modules";

const ProfileNavigationStack =
  createNativeStackNavigator<ProfileNavigationStackParamList>();

export const ProfileNavigation = () => {
  return (
    <ProfileNavigationStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="PROFILE_PAGE"
    >
      <ProfileNavigationStack.Screen
        name="SETTING"
        component={ProfileSettingScreen}
      />
      <ProfileNavigationStack.Screen
        name="ACCOUNT"
        component={AccountSettingScreen}
      />
      <ProfileNavigationStack.Screen
        name="LOCATION_SETTING"
        component={LocationSettingScreen}
      />
      <ProfileNavigationStack.Screen
        name="NOTIFICATION_SETTING"
        component={NotificationSettingScreen}
      />
      <ProfileNavigationStack.Screen
        name="TERMS_AND_CONDITION"
        component={TermsConditionScreen}
      />
      <ProfileNavigationStack.Screen
        name="CHANGE_PERSONAL_ASSISTANT"
        component={ChangePersonalAssistantScreen}
      />
      <ProfileNavigationStack.Screen
        name="PROFILE_AND_PRIVACY"
        component={ProfilePrivacyScreen}
      />
      <ProfileNavigationStack.Screen
        name="HELP_CENTER"
        component={HelpCenterScreen}
      />
      <ProfileNavigationStack.Screen
        name="FEEDBACK"
        component={FeedbackScreen}
      />
      <ProfileNavigationStack.Screen
        name="CHANGE_PASSWORD"
        component={ChangePasswordScreen}
      />
      <ProfileNavigationStack.Screen
        name="DEACTIVATE_ACCOUNT"
        component={DeactivateAccountScreen}
      />
      <ProfileNavigationStack.Screen
        name="MANAGE_SUBSCRIPTION"
        component={ManageSubscriptionScreen}
      />
      <ProfileNavigationStack.Screen
        name="SYNC_CALENDAR"
        component={SyncCalendarScreen}
      />
      <ProfileNavigationStack.Screen
        name="PRIVACY_POLICY"
        component={PrivacyPolicyScreen}
      />
      <ProfileNavigationStack.Screen
        name="PROFILE_PAGE"
        initialParams={{ tab: '' }}
        component={ProfileScreen}
      />
      <ProfileNavigationStack.Screen
        name="FRIEND"
        component={FriendDetailsScreen}
      />
      <ProfileNavigationStack.Screen
        name="PROFILE_NOTIFICATION"
        component={NotificationScreen}
      />
      <ProfileNavigationStack.Screen name="QR_CODE" component={QRCodeScreen} />
    </ProfileNavigationStack.Navigator>
  );
};
