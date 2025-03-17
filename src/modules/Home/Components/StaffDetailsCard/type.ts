import { BusinessStaffEntity, StaffPrice } from "@gooday_corp/gooday-api-client";

export type StaffDetailsCardProps = {
  staff: BusinessStaffEntity;
  staffPrice?: number;
  onPress?: () => void;
  active?: boolean
  disabled?: boolean
  individualPricingPerStaff?: boolean
};
