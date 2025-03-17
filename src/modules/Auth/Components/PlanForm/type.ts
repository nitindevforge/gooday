import { UserPlanDTO } from "@gooday_corp/gooday-api-client";
import { FormikProps } from "formik";
import { ImageBackgroundProps } from "react-native";

export type PlanFormProps = {
  form: FormikProps<PlanFormState>;
  isLoading: boolean
};

export type PlanFormState = {
  plan: UserPlanDTO;
};

export type Plan = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  type: string;
  bgImage: ImageBackgroundProps
  planInfo: PlanInfo[];
  tag?: string
};

export type PlanInfo = {
  title: string;
  subtitle: string;
};
