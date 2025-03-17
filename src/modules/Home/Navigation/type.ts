import { BusinessTypeEntity, WhatsOnEntity } from "@gooday_corp/gooday-api-client";
import { ServiceListProps } from "../Containers/ServiceList/type";

export type HomeNavigationParamList = {
  HOMEPAGE: undefined;
  DAILY_BRIEFING: undefined;
  BUSINESS_TYPE: undefined;
  CATEGORIES: {
    type: BusinessTypeEntity;
  };
  FIND_STUDIO: {
    categoryId: string;
    title: string;
  };
  FIND_VENUE: {
    categoryId: string;
    title: string;
    businessType?: string;
  };
  STAFF_ROSTER: undefined;
  INVITE_FRIENDS: undefined;
  BOOKING: undefined;
  AVAILABILITIES: {
    date: Date;
  };
  BOOKING_DETAILS: undefined;
  PAYMENT: undefined;
  CONFIRMATION: {
    bookingID: string;
  };
  POLICY: { policies: string; businessName: string };
  NOTIFICATION: undefined;
  TERMS_AND_CONDITION: undefined;
  WAITLIST: { name: string };
  ACCOUNT_SETTING: undefined;
  VENUE_DETAILS: { id: string, home?: boolean };
  EVENT_DETAILS: { data: WhatsOnEntity };
  ADD_ON: { type: "EVENT" | "SERVICE" }
  VENUE_LIST: {
    categoryId: string;
    title: string;
  }
  INVITE_STAFF: { data: ServiceListProps['purchase'] }
  BOOKING_METHOD: undefined
  WHATS_ON: undefined
  FRIENDS_FAVORITE_VENUES: { back?: string }
  CALENDAR_EVENTS_LIST: undefined
  BUSINESS_HOME: undefined
  PREPAID_SERVICE_LIST: undefined
  WHATS_ON_BUSINESS: undefined
  WHATS_ON_BOOKING: undefined
};
