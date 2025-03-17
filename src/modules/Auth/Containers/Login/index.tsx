import React from "react";
import { LoginForm, useLogin } from "@app/modules";

const Login: React.FC = () => {
  const { form, isLoading } = useLogin();

  return <LoginForm isLoading={isLoading} form={form} />;
};

export default Login;
