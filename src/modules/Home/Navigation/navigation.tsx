import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Fragment } from "react";
import { HomeNavigationParamList } from "./type";
import {
  BusinessTypeScreen,
  CategoriesScreen,
  FindStudioScreen,
  StaffRosterScreen,
  InviteFriendsScreen,
  BookingScreen,
  AvailabilitiesScreen,
  BookingDetailsScreen,
  ConfirmationScreen,
  PoliciesScreen,
  HomeScreen,
  NotificationScreen,
  PaymentDetailsScreen,
  TermsConditionScreen,
  WaitListScreen,
  ProfileNavigation,
  FindVenueScreen,
  VenueDetailsScreen,
  EventDetailsScreen,
  ServiceAddOnsScreen,
  VenueListScreen,
  InviteStaffScreen,
  BookingVenueMethodScreen,
  WhatsOnListScreen,
  FriendsFavoriteVenuesScreen,
  CalendarEventsContainerScreen,
  BusinessHomeScreen,
  PrepaidServiceScreen,
  WhatsOnBusinessContainerScreen,
  WhatsOnBusinessBookingScreen,
} from "@app/modules";

const HomeNavigationStack =
  createNativeStackNavigator<HomeNavigationParamList>();

const HomeNavigation = () => {
  return (
    <Fragment>
      <HomeNavigationStack.Navigator initialRouteName="HOMEPAGE" screenOptions={{ headerShown: false }}>
        <HomeNavigationStack.Screen name="HOMEPAGE" options={{ gestureEnabled: false }} component={HomeScreen} />
        <HomeNavigationStack.Screen
          name="BUSINESS_TYPE"
          component={BusinessTypeScreen}
        />
        <HomeNavigationStack.Screen
          name="CATEGORIES"
          component={CategoriesScreen}
        />
        <HomeNavigationStack.Screen
          name="FIND_STUDIO"
          component={FindStudioScreen}
        />
        <HomeNavigationStack.Screen
          name="FIND_VENUE"
          component={FindVenueScreen}
        />
        <HomeNavigationStack.Screen
          name="STAFF_ROSTER"
          component={StaffRosterScreen}
        />
        <HomeNavigationStack.Screen
          name="INVITE_FRIENDS"
          component={InviteFriendsScreen}
        />
        <HomeNavigationStack.Screen name="BOOKING" component={BookingScreen} />
        <HomeNavigationStack.Screen
          name="AVAILABILITIES"
          component={AvailabilitiesScreen}
        />
        <HomeNavigationStack.Screen
          name="BOOKING_DETAILS"
          component={BookingDetailsScreen}
        />
        <HomeNavigationStack.Screen
          name="PAYMENT"
          component={PaymentDetailsScreen}
        />
        <HomeNavigationStack.Screen
          options={{ gestureEnabled: false }}
          name="CONFIRMATION"
          component={ConfirmationScreen}
        />
        <HomeNavigationStack.Screen name="POLICY" component={PoliciesScreen} />
        <HomeNavigationStack.Screen
          name="NOTIFICATION"
          component={NotificationScreen}
        />
        <HomeNavigationStack.Screen
          name="TERMS_AND_CONDITION"
          component={TermsConditionScreen}
        />
        <HomeNavigationStack.Screen
          name="WAITLIST"
          component={WaitListScreen}
        />
        <HomeNavigationStack.Screen
          name="ACCOUNT_SETTING"
          component={ProfileNavigation}
        />
        <HomeNavigationStack.Screen
          name="VENUE_DETAILS"
          component={VenueDetailsScreen}
        />
        <HomeNavigationStack.Screen
          name="EVENT_DETAILS"
          component={EventDetailsScreen}
        />
        <HomeNavigationStack.Screen
          name="ADD_ON"
          component={ServiceAddOnsScreen}
        />
        <HomeNavigationStack.Screen
          name="VENUE_LIST"
          component={VenueListScreen}
        />
        <HomeNavigationStack.Screen
          name="INVITE_STAFF"
          component={InviteStaffScreen}
        />
        <HomeNavigationStack.Screen
          name="BOOKING_METHOD"
          component={BookingVenueMethodScreen}
        />
        <HomeNavigationStack.Screen
          name="WHATS_ON"
          component={WhatsOnListScreen}
        />
        <HomeNavigationStack.Screen
          name="FRIENDS_FAVORITE_VENUES"
          component={FriendsFavoriteVenuesScreen}
        />
        <HomeNavigationStack.Screen
          name="CALENDAR_EVENTS_LIST"
          component={CalendarEventsContainerScreen}
        />
        <HomeNavigationStack.Screen
          name="BUSINESS_HOME"
          options={{ gestureEnabled: false }}
          component={BusinessHomeScreen}
        />
        <HomeNavigationStack.Screen
          name="PREPAID_SERVICE_LIST"
          component={PrepaidServiceScreen}
        />
        <HomeNavigationStack.Screen
          name="WHATS_ON_BUSINESS"
          component={WhatsOnBusinessContainerScreen}
        />
        <HomeNavigationStack.Screen
          name="WHATS_ON_BOOKING"
          component={WhatsOnBusinessBookingScreen}
        />
      </HomeNavigationStack.Navigator>
    </Fragment>
  );
};

export default HomeNavigation;
