import React from "react";
import { AuthDefaultLayout, ResetPasswordContainer } from "@app/modules";

export const ResetPasswordScreen = () => {
  return (
    <AuthDefaultLayout hideLogo hideProgress className="bg-white" header="Create New Password">
      <ResetPasswordContainer />
    </AuthDefaultLayout>
  );
}