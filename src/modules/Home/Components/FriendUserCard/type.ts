import {  UserEntity } from "@gooday_corp/gooday-api-client";

export type FriendCardProps = {
  friend: UserEntity;
  onPress?: () => void;
  active?: boolean
  disabled?: boolean
};
