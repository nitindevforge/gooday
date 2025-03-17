import React from 'react'
import { SignUpForm, useSignUp } from '@app/modules';

const SignUp: React.FC = () => {
  const { form, isLoading } = useSignUp();

  return <SignUpForm form={form} isLoading={isLoading} />;
}

export default SignUp