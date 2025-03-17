import { Button } from "@app/ui";
import React from "react";
import { Platform, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AuthOptionButtonsProps, Options } from "./type";
import clsx from "clsx";
import { useLoginOptions } from "@app/common";

const AuthOptionButtons: React.FC<AuthOptionButtonsProps> = ({
  apple = true,
  google = true,
  mail = true,
  outline = false,
}) => {
  const tailwind = useTailwind();
  const { loginWithGoogle, isGoogleLoading, loginWithEmail, loginWithApple } =
    useLoginOptions();

  const options: Options[] = [
    {
      id: "1",
      title: "Continue with Google",
      icon: "google",
      loading: isGoogleLoading,
      onPress: loginWithGoogle,
      show: google,
    },
    {
      id: "2",
      title: "Continue with Apple",
      icon: "apple",
      loading: false,
      onPress: loginWithApple,
      show: Platform.select({
        android: false,
        ios: apple,
      }),
    },
    {
      id: "3",
      title: "Continue with Email",
      icon: "mail",
      loading: false,
      onPress: loginWithEmail,
      show: mail,
    },
  ];

  return (
    <View style={tailwind("bottom-0")}>
      {options?.map(
        (option, index) =>
          option.show && (
            <Button
              key={option?.id}
              radius="rounded-full"
              icon={option?.icon}
              iconProps={{
                height: 20,
                width: 20,
              }}
              title={option?.title}
              className={clsx("justify-center", {
                "border-black": outline,
                "mt-4": index > 0,
              })}
              loading={option?.loading}
              variant={outline ? "outline" : "normal"}
              onPress={option?.onPress}
              color="white"
              // textStyles={outline}
            />
          )
      )}
    </View>
  );
};

export default AuthOptionButtons;
