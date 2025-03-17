import { EventResponse } from "@gooday_corp/gooday-api-client";

export type CalendarNavigationParamList = {
  CALENDAR_PAGE: { event?: boolean, userId?: string, eventDetails?: EventResponse };
  COLLABORATOR: undefined
  CALENDAR_REQUEST: { withMore: string }
  NOTIFICATIONS: { type: string[] }
  POLICY: { policies: string; businessName: string };
};
