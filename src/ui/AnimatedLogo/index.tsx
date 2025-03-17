import React, { FC, useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { AnimatedLogoProps } from "./type";
import { ColorValue } from "react-native";

export const AnimatedLogo: FC<AnimatedLogoProps> = ({
  height = 276,
  width = 276,
  colorTransition = true,
  infinity = false
}) => {
  const rotateLogo = useSharedValue<number>(0);
  const logoColor = useSharedValue<ColorValue>("#FECB4D");

  const animatedLogo = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateLogo.value}deg` }],
  }));

  useEffect(() => {
    const rotateLogoWithTiming = withTiming(360, {
      duration: 4000,
      easing: Easing.linear,
    });
    rotateLogo.value = infinity ? withRepeat(rotateLogoWithTiming, -1) : rotateLogoWithTiming;
  }, [infinity]);

  useEffect(() => {
    if (colorTransition) {
      logoColor.value = "#FECB4D";
      logoColor.value = withTiming("white", { duration: 3000 });
    }
  }, [logoColor, colorTransition]);

  const stroke = logoColor?.value;

  return (
    <>
      <Animated.View style={animatedLogo}>
        <Svg width={width} height={height} viewBox="0 0 276 276" fill="none">
          <Path
            d="M246.5 99.5L268 91M246.5 178L268 185.5M30.5 178L8.5 185.5M30.5 95.5L8.5 87"
            stroke={stroke}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <Path
            d="M81 10L92.5 32"
            stroke={stroke}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <Path
            d="M192 9L181 29.5"
            stroke={stroke}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <Path
            d="M84 266L94 245"
            stroke={stroke}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <Path
            d="M184 245.5L194 265"
            stroke={stroke}
            strokeWidth={8}
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
      <Svg
        style={{
          position: "absolute",
        }}
        width={width}
        height={height}
        viewBox="0 0 276 276"
        fill="none"
      >
        <Path
          d="M87.0892 136.995H120C125.523 136.995 130 141.472 130 146.995V208.795C130 214.941 124.505 219.622 118.621 217.85C92.1436 209.877 54.3607 186.53 54.0029 136.995C53.486 65.4187 121.211 54.5268 130 55.5641"
          stroke={stroke}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <Path
          d="M145 207.584V68.1993C145 59.3248 153.175 52.7554 161.416 56.0484C187.853 66.6123 221.659 91.6169 220.99 137.734C220.325 183.548 187.34 208.759 161.536 219.624C153.293 223.096 145 216.529 145 207.584Z"
          stroke={stroke}
          strokeWidth={8}
        />
      </Svg>
    </>
  );
};
