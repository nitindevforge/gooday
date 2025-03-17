import React, { Fragment } from "react";
import { OnboardContainer } from "@app/modules";
import { StatusBar } from "react-native";

export const OnboardScreen = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <OnboardContainer />
    </Fragment>
  );
};
