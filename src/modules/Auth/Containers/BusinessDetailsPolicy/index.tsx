import React from 'react'
import { AuthDefaultLayout, BusinessDetailsPolicyForm, useBusinessDetailsPolicy } from '@app/modules';

export const BusinessDetailsPolicyContainer: React.FC = () => {
  const { form, isLoading } = useBusinessDetailsPolicy();

  return (
    <AuthDefaultLayout
      className="bg-white"
      header="Business Details"
    >
      <BusinessDetailsPolicyForm form={form} isLoading={isLoading} />
    </AuthDefaultLayout>
  );
}