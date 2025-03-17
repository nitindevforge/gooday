import React from 'react'
import { ForgotPasswordForm, useForgotPassword } from '@app/modules';

export const ForgotPasswordContainer: React.FC = () => {
  const { form, isLoading } = useForgotPassword();

  return <ForgotPasswordForm isLoading={isLoading} form={form} />;
}