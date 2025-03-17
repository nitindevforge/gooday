import React from "react";
import { ProfileLayout } from "../../Components";
import { SyncCalendarListContainer } from "../../Containers";

export const SyncCalendarScreen = () => {
  return (
    <ProfileLayout header="Sync Calendar">
      <SyncCalendarListContainer />
    </ProfileLayout>
  );
};
