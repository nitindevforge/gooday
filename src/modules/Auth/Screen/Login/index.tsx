import React from "react";
import { AuthDefaultLayout, LoginContainer } from "@app/modules";
import { useNavigationRoute } from "@app/common";
import { Loading } from "@app/ui";

function LoginScreen() {
  const { hideModel } = useNavigationRoute();
  return hideModel ? (
    <Loading loading={true} />
  ) : (
    <AuthDefaultLayout
      hideLogo
      progress={10}
      hideProgress
      className="bg-white"
      header="Sign In"
    >
      <LoginContainer />
    </AuthDefaultLayout>
  );
}

export default LoginScreen;
