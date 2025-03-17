import { CardForm } from "@stripe/stripe-react-native";
import React, { FC } from "react";
import { Platform, useColorScheme } from "react-native";
import { PaymentCardProps } from "./type";

export const PaymentCard: FC<PaymentCardProps> = ({
  onSubmit = () => { },
  style,
}) => {
  const color = useColorScheme();

  return (
    <CardForm
      onFormComplete={onSubmit}
      placeholders={{
        number: "1234 1234 1234 1234",
      }}
      cardStyle={
        Platform.select({
          android: {
            borderRadius: 12,
            backgroundColor: color === "dark" ? "#818181" : "#FFFFFF",
            borderColor: color === "dark" ? "#818181" : "#000000",
            textColor: color === "dark" ? "#FFFFFF" : "#000000",
            placeholderColor: color === "dark" ? "#FFFFFF" : "#000000",
          },
          ios: {
            borderRadius: 8,
            borderColor: color === "dark" ? "black" : "#EEE",
            backgroundColor: color === "dark" ? "black" : "#EEE",
            textColor: color === "dark" ? "white" : "black",
            placeholderColor: color === "dark" ? "white" : "black",
          }
        })
      }
      style={[{ height: 200, marginVertical: 20 }, style]}
    />
  );
};
