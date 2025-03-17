import React from "react";
import { AuthDefaultLayout, RoleContainer } from "@app/modules";
import { StatusBar } from "react-native";

const RoleScreen = () => {
  return (
    <AuthDefaultLayout
      hideProgress={true}
      className="bg-white"
      header={`How will you be using Gooday?`}
    >
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <RoleContainer />
    </AuthDefaultLayout>
  );
};

export default RoleScreen;
