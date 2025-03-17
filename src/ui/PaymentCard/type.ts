import { Props } from "@stripe/stripe-react-native";
import { ViewStyle } from "react-native";

export type PaymentCardProps = {
  onSubmit?: (cardDetails: any) => {};
  style?: ViewStyle;
};
