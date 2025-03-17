import { EventResponse, BookingResponse, UserEntity } from '@gooday_corp/gooday-api-client';

export type DailyBriefingCardProps = {
  item: EventResponse & BookingResponse;
  user: UserEntity;
  onView: () => void;
};
