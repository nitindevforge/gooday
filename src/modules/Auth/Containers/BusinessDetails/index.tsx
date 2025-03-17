import React from "react";
import {
  AuthDefaultLayout,
  BusinessDetailsForm,
  useBusinessDetails,
} from "@app/modules";

export const BusinessDetailsContainer: React.FC = () => {
  const { form, isLoading, onSubmitDetails } = useBusinessDetails();

  return (
    <AuthDefaultLayout className="bg-white" header="Business Details">
      <BusinessDetailsForm
        form={form}
        isLoading={isLoading}
        onSubmitDetails={onSubmitDetails}
      />
    </AuthDefaultLayout>
  );
};
