import { TouchableOpacityProps } from "react-native";
import { PlanEntity } from "@gooday_corp/gooday-api-client";
import { ReactNode } from "react";
import { PurchasesOffering } from "react-native-purchases";

export interface PlanCardProps extends TouchableOpacityProps {
  className?: string;
  checked?: boolean;
  plan: {
    metadata: PlanEntity;
  } & PurchasesOffering;
  children?: ReactNode;
}
