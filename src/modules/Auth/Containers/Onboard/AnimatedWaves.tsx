import { useEffect } from "react";
import Animated, { cancelAnimation, Easing, useAnimatedProps, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg"

interface AnimatedWaveProps {
  height: number;
  width: number;
}


const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AnimatedWave: React.FC<AnimatedWaveProps> = ({ height, width }) => {

  const path = useSharedValue("")
  const tick = useSharedValue(height)
  const loop = useSharedValue(0)
  const ops = useSharedValue<any>('inc')

  useEffect(() => {
    loop.value = withRepeat(withTiming(0, { duration: 0, easing: Easing.linear }, () => {
      path.value = `M 0 40 C ${width * 0.3} 0, ${width * 0.3} ${tick.value} ${width * 0.7} 50 C ${width * 0.8} 0, ${width * 0.9} 0, ${width} 40 L ${width} ${height} L 0 ${height} Z`;

      if (ops.value === 'inc') {
        tick.value += (height * 0.006)

        if (tick.value > (height * 1.3)) {
          ops.value = 'dec'
        }
      } else {
        tick.value -= (height * 0.006)

        if (tick.value <= height * 0.7) {
          ops.value = 'inc'
        }
      }
    }), -1, false)
    return () => cancelAnimation(loop);
  }, [])

  const animatedProps = useAnimatedProps(() => ({
    d: path.value
  }), [path.value]);

  return (
    <Svg
      viewBox={`0 0 ${width} ${height}`} width={width} height={height}
    >
      <AnimatedPath animatedProps={animatedProps} fill="#5FB9F5" />
    </Svg>
  )
}