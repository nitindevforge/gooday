import React from "react";
import { ProfileLayout, ProfileSettingList } from "../../Components";

export const ProfileSettingScreen = () => {
  return (
    <ProfileLayout header="Settings">
      <ProfileSettingList />
    </ProfileLayout>
  );
};
