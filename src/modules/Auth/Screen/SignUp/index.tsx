import React from "react";
import { AuthDefaultLayout, SignUpContainer } from "@app/modules";
import { Loading } from "@app/ui";
import { useNavigationRoute } from "@app/common";
import { StatusBar } from "react-native";

function SignUpScreen() {
  const { hideModel } = useNavigationRoute();

  return hideModel ? <Loading loading={true} /> : (
    <AuthDefaultLayout
      progress={10}
      className="bg-white"
      header="Create an account"
    >
      <StatusBar barStyle='dark-content' />
      <SignUpContainer />
    </AuthDefaultLayout>
  );
}

export default SignUpScreen;
