import React from 'react'
import { BusinessSignUpForm, useBusinessSignUp } from '@app/modules';

export const BusinessSignUpContainer: React.FC = () => {
  const { form, isLoading } = useBusinessSignUp();

  return <BusinessSignUpForm form={form} isLoading={isLoading} />;
}