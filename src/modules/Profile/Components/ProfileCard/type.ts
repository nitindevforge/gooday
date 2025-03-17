import { FRIEND_REQUEST_STATUS } from "@app/modules";

export type ProfileCardProps = {
  status?: FRIEND_REQUEST_STATUS;
  loading?: boolean;
  name: string;
  userId?: string;
  image?: string;
  goodyId?: string;
  onFriend?: () => void;
}