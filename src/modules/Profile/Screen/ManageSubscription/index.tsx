import React, { Fragment } from "react";
import { ProfileLayout } from "../../Components";
import { InAppSubscriptions } from "@app/modules";

export const ManageSubscriptionScreen = () => {
  return (
    <Fragment>
      <ProfileLayout header="Manage Subscription">
        <InAppSubscriptions />
      </ProfileLayout>
    </Fragment>
  );
};
