import React from "react";
import {
  AuthDefaultLayout,
  UserRole,
  AuthNavigationParamList,
  Role,
  AuthOptionButtons,
} from "@app/modules";
import { useNavigationRoute } from "@app/common";
import { Loading } from "@app/ui";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StatusBar, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";

const AuthOptionsScreen = () => {
  const { hideModel } = useNavigationRoute();
  const tailwind = useTailwind();

  const { params } =
    useRoute<
      RouteProp<
        AuthNavigationParamList,
        "AUTH_OPTIONS" | "BUSINESS_SOFTWARE_OPTION"
      >
    >();
  const isBusiness = params?.role === Role.BUSINESS;

  const backgroundImage = isBusiness
    ? require("../../../../assets/Images/business-top-bg.png")
    : require("../../../../assets/Images/option-bg.png");

  return hideModel ? (
    <Loading loading={true} />
  ) : (
    <AuthDefaultLayout
      backgroundImage={backgroundImage}
      header=" "
      logoType={isBusiness ? "primary" : "normal"}
      hideProgress
      className={clsx({
        "bg-primary-300": isBusiness,
      })}
    >
      <StatusBar barStyle='light-content' backgroundColor={isBusiness ? '#79C2EC' : '#FEB74D'} />

      <UserRole isBusiness={isBusiness} />
      <View style={tailwind("flex-1 justify-end mb-10")}>
        <AuthOptionButtons />
      </View>
    </AuthDefaultLayout>
  );
};

export default AuthOptionsScreen;
