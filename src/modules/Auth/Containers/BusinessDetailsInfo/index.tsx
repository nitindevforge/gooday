import React from 'react'
import { AuthDefaultLayout, BusinessDetailsInfoForm, useBusinessDetailsInfo } from '@app/modules';

export const BusinessDetailsInfoContainer: React.FC = () => {
  const { form, isLoading } = useBusinessDetailsInfo();

  return (
    <AuthDefaultLayout
      className="bg-white"
      header="Business Details"
    >
      <BusinessDetailsInfoForm form={form} isLoading={isLoading} />
    </AuthDefaultLayout>
  );
}