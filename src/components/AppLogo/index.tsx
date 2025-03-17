import React from "react";
import { Image } from "react-native";
import { useTailwind } from "tailwind-rn";

export const AppLogo = () => {
  const tailwind = useTailwind();
  return (
    <Image
      style={tailwind("w-12 h-12")}
      source={require("@app/assets/Images/logo-primary.png")}
    />
  );
};
