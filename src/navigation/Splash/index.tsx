import React, { Fragment, useEffect, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Animated as reactNativeAnimated, StatusBar } from "react-native";
import { AnimatedLogo } from "@app/ui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTailwind } from "tailwind-rn";
import { RootNavigationParamList } from "../Root";
import { useNavigation } from "@react-navigation/native";
import { useGetUser } from "@app/modules";
import { getBriefing } from "@app/utils";

export const SplashScreen = () => {
  const tailwind = useTailwind();
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();

  const { isLoading, isSuccess, data } = useGetUser();

  const moveLogo = useSharedValue(600);
  const backGroundColor = useRef(new reactNativeAnimated.Value(0)).current;

  const animateMoveLogo = useAnimatedStyle(() => ({
    transform: [{ translateY: moveLogo.value }],
  }));

  const backgroundColorAnimated = backGroundColor.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ["black", "#2F4B93", "#3A5ACA", "#79C2EC", "#FECB4D"],
  });

  useEffect(() => {
    if (!isLoading && moveLogo?.value < -90) {
      (async () => {
        // const briefing = await getBriefing();
        if (isSuccess && !data?.data.data.pendingAction?.length) {
          // if (briefing) {
          //   navigation.replace("DAILY_BRIEFING_CHAT");
          // } else {
          if (data?.data?.data?.role === 'business') {
            navigation.replace("APP", {
              screen: "HOME",
              params: {
                screen: "BUSINESS_HOME"
              }
            } as any);
          } else {
            navigation.replace("APP");
          }
          // }
        } else {
          navigation.replace("AUTH");
        }
      })();
    }
  }, [isLoading, isSuccess, navigation, data, loading, moveLogo]);

  useEffect(() => {
    moveLogo.value = withTiming(-100, { duration: 4000 });
    const BGAnimation = [1, 2, 3, 4].map((value) =>
      reactNativeAnimated.timing(backGroundColor, {
        toValue: value,
        duration: 1000,
        useNativeDriver: false,
      })
    );
    reactNativeAnimated.sequence(BGAnimation).start(({ finished }) => {
      setLoading(finished);
    });
  }, []);

  return (
    <Fragment>
      <StatusBar backgroundColor="#FECB4D" />
      <reactNativeAnimated.View
        style={[
          tailwind("flex-1 items-center justify-center bg-primary-200 h-full"),
          { backgroundColor: backgroundColorAnimated },
        ]}
      >
        <Animated.View style={[tailwind("relative"), animateMoveLogo]}>
          <AnimatedLogo />
        </Animated.View>
      </reactNativeAnimated.View>
    </Fragment>
  );
};
