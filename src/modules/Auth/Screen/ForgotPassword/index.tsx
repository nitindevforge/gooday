import React from "react";
import { AuthDefaultLayout, ForgotPasswordContainer } from "@app/modules";

export const ForgotPasswordScreen = () => {
  return (
    <AuthDefaultLayout hideLogo hideProgress className="bg-white" header="Reset Password">
      <ForgotPasswordContainer />
    </AuthDefaultLayout>
  );
}