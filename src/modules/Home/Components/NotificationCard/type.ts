import { NotificationEntity } from "@gooday_corp/gooday-api-client";
type Actions = {
  color: string;
  label: string;
  target: string;
  type: string;
}
export type NotificationCardProps = {
  onRead?: (id: string) => void;
  loading?: boolean;
  item: NotificationEntity & {
    createdAt: Date;
    actions: Actions[];
  }
};