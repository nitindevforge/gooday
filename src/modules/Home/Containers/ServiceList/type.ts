import { PrepaidServiceEntity } from "@gooday_corp/gooday-api-client";

export interface ServiceListProps {
  purchase: { _id: string, quantity: number, service?: PrepaidServiceEntity };
  setPurchase: any
}