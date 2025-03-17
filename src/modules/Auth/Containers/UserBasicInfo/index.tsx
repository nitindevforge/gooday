import React from "react";
import { NicknameFrom, useNickname, AuthDefaultLayout } from "@app/modules";
import { StatusBar } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const UserBasicInfo: React.FC = () => {
  const { form, isLoading } = useNickname();
  const isFocused = useIsFocused();

  return (
    <AuthDefaultLayout
      backgroundImage={require("../../../../assets/Images/nickname-bg.png")}
      header=" "
      logoType="normal"
    >
      {isFocused && <StatusBar backgroundColor="#FECB4D" barStyle="dark-content" />}

      <NicknameFrom form={form} isLoading={isLoading} />
    </AuthDefaultLayout>
  );
};

export default UserBasicInfo;
