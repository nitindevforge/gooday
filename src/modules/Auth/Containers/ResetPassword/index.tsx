import React from 'react'
import { ResetPasswordForm, useResetPassword } from '@app/modules';

export const ResetPasswordContainer: React.FC = () => {
  const { form, isLoading } = useResetPassword();

  return <ResetPasswordForm isLoading={isLoading} form={form} />;
}