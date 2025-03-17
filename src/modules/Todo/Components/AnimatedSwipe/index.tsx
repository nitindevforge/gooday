import React, { PropsWithChildren, useRef, useImperativeHandle } from "react";
import { Animated, Dimensions, Easing, Text } from "react-native";

export interface AnimatedSwipeProperties {
  slideLeft: (onSuccess?: () => void) => void;
  slideRight: (onSuccess?: () => void) => void;
}

export const AnimatedSwipe = React.forwardRef<AnimatedSwipeProperties, PropsWithChildren>(({ children, ...rest }, ref) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('screen')

  const slideLeft = (cb?: () => void) => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(cb);
  };

  const slideRight = (cb?: () => void) => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(cb);
  }

  useImperativeHandle(ref, () => ({
    slideLeft,
    slideRight
  }), [])

  const opacity = slideAnim.interpolate({
    inputRange: [-width, 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });


  return <Animated.View {...rest} style={[
    (rest as any).style ?? {},
    {
      transform: [
        {
          translateX: slideAnim
        },
      ],
      opacity
    },
  ]}>
    {children}
  </Animated.View>
})