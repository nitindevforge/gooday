import React from "react";
import { AccountSettingList, ProfileLayout } from "../../Components";

export const AccountSettingScreen = () => {
  return (
    <ProfileLayout header="Account">
      <AccountSettingList />
    </ProfileLayout>
  );
};
