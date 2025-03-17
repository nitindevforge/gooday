import React from "react";
import { BirthdayForm, AuthDefaultLayout, useBirthday } from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "react-native";

const UserDobInfo: React.FC = () => {
  const { form: birthdayFrom, isLoading } = useBirthday();
  const tailwind = useTailwind();
  const isFocused = useIsFocused();

  return (
    <AuthDefaultLayout
      backgroundImage={require("../../../../assets/Images/birthday-bg.png")}
      header=" "
      logoType="normal"
      childrenStyles={tailwind("px-0")}
    >
      {isFocused && <StatusBar backgroundColor="#FECB4D" barStyle="dark-content" />}

      <BirthdayForm isLoading={isLoading} form={birthdayFrom} />
    </AuthDefaultLayout>
  );
};

export default UserDobInfo;
