import { Icon, Typography } from "@app/ui";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { HeaderWithLogoProps } from "./type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AuthNavigationParamList,
  Role,
  USER_SIGNUP_DETAILS,
} from "@app/modules";
import clsx from "clsx";
import { useNavigationRoute } from "@app/common";
import { storageService } from "@app/services";
import { UserEntity } from "@gooday_corp/gooday-api-client";

let ignoreBackButton = ["business_confirmation", "assistant"];
const requireImage = require("../../../../assets/Images/logo-primary.png")
const requireImage1 = require("../../../../assets/Images/logo.png")

const HeaderWithLogo: React.FC<HeaderWithLogoProps> = ({
  title,
  subtitle,
  logoType = "primary",
  className,
  hideLogo = false,
  back = true,
}) => {
  const [user, setUser] = useState<UserEntity>();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
  const tailwind = useTailwind();
  const { canBackGo, goToRoute, currentRoute, pendingActionsState, resetRouteState } =
    useNavigationRoute();

  const logo =
    logoType === "primary"
      ? requireImage
      : requireImage1;

  const goBack = () => {
    if (currentRoute === "verify_email") {
      resetRouteState();
      return;
    }
    canBackGo ? goToRoute(true) : navigation?.goBack();
  };
  useEffect(() => {
    (async () => {
      const userDetails = await storageService.getItem(USER_SIGNUP_DETAILS)
      const user = JSON.parse(userDetails!);
      setUser(user)
    })()
  }, [])
  const checkCanBackGo = () => {
    if (
      user?.role === Role.BUSINESS &&
      "assistant" === currentRoute
    ) {
      ignoreBackButton = ignoreBackButton?.filter((el) => el !== "assistant");
    }
    if (ignoreBackButton?.includes(currentRoute)) return false;
    return pendingActionsState?.length
      ? currentRoute === "verify_email"
        ? true
        : canBackGo
      : back;
  };

  return (
    <View
      style={[
        tailwind(
          clsx(
            "flex-row justify-between items-center flex-nowrap w-full",
            className
          )
        ),
      ]}
    >
      {checkCanBackGo() && (
        <TouchableOpacity
          style={tailwind("flex items-start w-7 h-11 justify-center")}
          onPress={goBack}
        >
          <Icon
            fill="#2E2E2E"
            name="back"
            stroke="none"
            width={10}
            height={20}
          />
        </TouchableOpacity>
      )}

      <View style={tailwind("flex-col flex-1")}>
        <View style={[tailwind("flex-row items-center"), { gap: 12 }]}>
          <View style={tailwind("flex-1")}>
            <Typography weight="medium" variant="2xl" className="leading-7">
              {title}
            </Typography>
          </View>
          {!hideLogo && <Image style={tailwind("w-10 h-10")} source={logo} />}
        </View>
        {!!subtitle && <Typography variant="lg">{subtitle}</Typography>}
      </View>
    </View>
  );
};
export default HeaderWithLogo;
