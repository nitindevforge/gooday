import React, { Fragment, useEffect, useState } from "react";
import { Animated, Image, StatusBar, View } from "react-native";
import { Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "@app/navigation";
import { Role, useGetUser } from "@app/modules";
import { Assistant } from "@app/components";
import { getBriefing } from "@app/utils";

const WelcomeScreen = () => {
  const tailwind = useTailwind();
  const { data } = useGetUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();

  const bottom = useState(new Animated.Value(-700))[0];

  const moveAvatar = () => {
    Animated.spring(bottom, {
      toValue: -385,
      delay: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setTimeout(async () => {
      // const briefing = await getBriefing();
      // briefing ? navigation.replace('DAILY_BRIEFING_CHAT') : navigation.replace("APP");
      navigation.replace("APP");
    }, 3000);
  }, []);

  useEffect(() => {
    moveAvatar();
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View
        style={tailwind(
          `${data?.data?.data?.role === Role.PERSONAL
            ? "bg-primary-200"
            : "bg-primary-300"
          } flex-1 items-center justify-center px-6`
        )}
      >
        <View style={tailwind("flex-1 items-center justify-center")}>
          <Typography
            color="white"
            weight="medium"
            variant="3xl"
            className="text-center"
          >
            Welcome to Gooday!
          </Typography>
        </View>
        <View style={tailwind("flex-1")}>
          <Image
            style={tailwind("w-68 h-68 mx-auto")}
            source={require("../../../../assets/Images/logo.png")}
          />
        </View>
        <View style={tailwind("flex-1")}>
          <Animated.View
            style={[
              tailwind("mt-8 absolute w-[246px] h-[697px]"),
              {
                bottom,
              },
            ]}
          >
            <Assistant
              style={tailwind("w-full h-full")}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </View>
    </Fragment>
  );
};

export default WelcomeScreen;
