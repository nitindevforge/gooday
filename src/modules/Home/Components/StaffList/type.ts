import { BusinessStaffEntity } from "@gooday_corp/gooday-api-client";

export type StaffListProps = {
  staff: BusinessStaffEntity[];
  today?: Date
};
