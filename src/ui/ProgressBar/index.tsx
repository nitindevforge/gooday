import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { ProgressBarProps } from "./type";
import { useTailwind } from "tailwind-rn";
import clsx from "clsx";

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  unfilledColor = "#78788029",
  color = "#2E2E2E",
  height = 4,
  borderRadius = 4,
  prevProgress = 0,
  back = false,
  duration = 1.5,
  className
}) => {
  const animation = useRef(new Animated.Value(back ? progress : prevProgress)).current;
  const inputRange = [0, 100];
  const outputRange = ['0%', '100%'];
  const animatedWidth = animation.interpolate({ inputRange, outputRange });
  const tailwind = useTailwind();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: back ? prevProgress : progress,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();
  }, [progress,prevProgress]);

  return (
    <View
      style={[
        {
          backgroundColor: unfilledColor,
          height,
          borderRadius,
        },
        tailwind(clsx("w-full",className)),
      ]}
    >
      <Animated.View
        style={[
          tailwind(clsx("rounded-12.5")),
          {
            width: animatedWidth,
            backgroundColor: color,
            height,
            borderRadius,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
