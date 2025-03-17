import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, Image, SafeAreaView, View, ViewToken } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { AnimatedWave } from "./AnimatedWaves";
import { Button, Typography } from "@app/ui";
import { shadowStyles } from "../../Utils";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "@app/navigation";
import { useGetUser } from "../../Data";
import { Easing } from "react-native-reanimated";
import { getBriefing } from "@app/utils";

const OnboardingStepLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const tailwind = useTailwind();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  return (
    <View style={tailwind('flex-1 justify-end')}>
      <AnimatedWave height={SCREEN_HEIGHT * 0.3} width={SCREEN_WIDTH} />
    </View>
  )
}

const OnboardingStepIntro = () => {
  const tailwind = useTailwind();
  const { width: SCREEN_WIDTH } = Dimensions.get('screen')
  const bottom = useState(new Animated.Value(-700))[0];

  const moveAvatar = () => {
    Animated.spring(bottom, {
      toValue: -200,
      delay: 1500,
      useNativeDriver: false,
    }).start();

  };

  useEffect(() => {
    moveAvatar();
  }, []);

  return (
    <View style={[tailwind('flex-1 items-center justify-center'), {}]}>
      <SafeAreaView />
      <View style={[tailwind('flex-1 items-center justify-center'), { top: 60, ...shadowStyles.boxShadow }]}>
        <Typography variant="3xl" color="white">Welcome to</Typography>
        <Image
          source={require('../../../../assets/Images/gooday.png')}
          resizeMode="contain"
          style={[tailwind(''), { width: SCREEN_WIDTH }]}
        />
        <Typography variant="3xl" color="white">Take a tour</Typography>
      </View>
      <View style={tailwind("flex-1 flex-row items-center justify-center overflow-hidden")}>
        <Animated.View style={[tailwind('flex-1'), { bottom: bottom }]}>
          <Image
            source={require('../../../../assets/Images/mike-assistant.png')}
            resizeMode="cover"
            style={{ width: 200, height: 600 }}
          />
        </Animated.View>
        <View style={[tailwind('flex-1'), { bottom: -200 }]}>
          <Image
            source={require('../../../../assets/Images/lena-assistant.png')}
            resizeMode="cover"
            style={{ width: 200, height: 600 }}
          />
        </View>
      </View>
    </View>
  )
}

const OnboardingStepFavoritePlaces = () => {
  const tailwind = useTailwind();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  return (
    <View style={tailwind('flex-1 px-8')}>
      <SafeAreaView />
      <View style={[{ top: 60, flex: 1, gap: 6, ...shadowStyles.boxShadow }]}>
        <Typography variant="3xl" color="primary-200">Connect</Typography>
        <Typography variant="3xl" color="white">with your favorite</Typography>
        <Typography variant="3xl" color="white">people and places</Typography>
      </View>
      <View style={[tailwind('flex items-center justify-start'), {}]}>
        <Image
          source={require('../../../../assets/Images/New-Homepage.png')}
          resizeMode="contain"
          style={[tailwind(''), { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.7 }]}
        />
      </View>
    </View>
  )
}

const OnboardingStepMutualAvailability = () => {
  const tailwind = useTailwind();

  return (
    <>
      <SafeAreaView />
      <View style={[tailwind('px-8')]}>
        <View style={[{ top: 60, gap: 6, ...shadowStyles.boxShadow }]}>
          <View style={[tailwind('flex-row justify-end'), { gap: 6 }]}>
            <Typography variant="3xl" color="primary-200">Book</Typography>
            <Typography variant="3xl" color="white">Mutually</Typography>
          </View>
          <Typography variant="3xl" className="text-right" color="white">available times</Typography>
          <Typography variant="3xl" className="text-right" color="white">using the blue dots</Typography>
        </View>
      </View>
      <View style={
        [tailwind('flex-1 absolute right-0 overflow-hidden'),
        { left: "10%", top: "40%" }]}
      >
        <Image
          source={require('../../../../assets/Images/Onboarding-Mutually-with-personal-assistants.png')}
          resizeMode="contain"
          style={[{ width: 500, height: 800 }]}
        />
      </View>
    </>
  )
}

const OnboardingStepShareCalendar = () => {
  const tailwind = useTailwind();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  return (
    <>
      <SafeAreaView />
      <View style={[tailwind('px-8 flex-1'), { top: 60 }]}>
        <View style={[tailwind('pb-4'), { gap: 6, ...shadowStyles.boxShadow }]}>
          <View style={[tailwind('flex-row items-center justify-center'), { gap: 6 }]}>
            <Typography className="text-center" variant="3xl" color="primary-200">Shared</Typography>
            <Typography className="text-center" variant="3xl" color="white">your calendars</Typography>
          </View>
          <Typography className="text-center" variant="3xl" color="white">with one friends</Typography>
        </View>
        <View style={[tailwind('pb-4'), {}]}>
          <Typography
            className="text-center"
            variant="base"
            color="white"
          >
            <Typography variant="base" color="primary-200">TIP:</Typography>
            {" "}With Gooday Pro, you can share calendars with unlimited friends AND sync your Google and Outlook calendars
          </Typography>
        </View>

        <View style={tailwind('flex items-center justify-center')}>
          <Image
            source={require('../../../../assets/Images/Shared-Calendar.png')}
            resizeMode="contain"
            style={[{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]}
          />
        </View>
      </View>
    </>
  )
}

const OnboardingStepTaskList = () => {
  const tailwind = useTailwind();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  return (
    <>
      <SafeAreaView />
      <View style={[tailwind('px-8 flex-1 justify-end'), { bottom: 60 }]}>
        <View style={[tailwind('pb-4'), { gap: 6, ...shadowStyles.boxShadow }]}>
          <View style={[tailwind('flex-row'), { gap: 6 }]}>
            <Typography variant="3xl" color="primary-200">Send</Typography>
            <Typography variant="3xl" color="white">your calendars</Typography>
          </View>
          <View style={[tailwind('flex-row'), { gap: 6 }]}>
            <Typography variant="3xl" color="primary-200">sync</Typography>
            <Typography variant="3xl" color="white"> list with</Typography>
          </View>
          <Typography variant="3xl" color="white">one friends</Typography>
        </View>
        <View style={[tailwind('flex pb-4'), {}]}>
          <View style={[tailwind('flex-row'), {}]}>
            <Typography variant="base" color="primary-200">TIP:</Typography>
            <Typography
              variant="base"
              color="white">With Gooday Pro, you can
            </Typography>
          </View>
          <Typography
            variant="base"
            color="white">send tasks and sync list
          </Typography>
          <Typography
            variant="base"
            color="white">with unlimited friends
          </Typography>
        </View>

        <View style={tailwind('flex items-center justify-center')}>
          <Image
            source={require('../../../../assets/Images/Onboarding-Tasks.png')}
            resizeMode="contain"
            style={[tailwind(''), { width: SCREEN_WIDTH, height: SCREEN_WIDTH }]}
          />
        </View>
      </View>
    </>
  )
}

const OnboardingStepDailyBriefing = () => {
  const tailwind = useTailwind();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  return (
    <>
      <SafeAreaView />
      <View style={[tailwind('px-8'), { top: 60 }]}>
        <View style={[tailwind('pb-6'), { gap: 6, ...shadowStyles.boxShadow }]}>
          <Typography className="text-center" variant="3xl" color="primary-200">Daily briefings</Typography>
          <Typography className="text-center" variant="3xl" color="white">from your</Typography>
          <Typography className="text-center" variant="3xl" color="white">personal assistant</Typography>
        </View>
        <View style={tailwind('flex items-center justify-end')}>
          <Image
            source={require('../../../../assets/Images/Onboarding-Daily-Briefings-Personal-assistants.png')}
            resizeMode="cover"
            style={[tailwind('-bottom-20'), { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]}
          />
        </View>
      </View>
    </>
  )
}

const OnboardingStepFeedback = () => {
  const tailwind = useTailwind();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

  return (
    <>
      <SafeAreaView />
      <View style={[tailwind('px-8'), { top: 60 }]}>
        <View style={[tailwind('pb-6'), { gap: 6, ...shadowStyles.boxShadow }]}>
          <Typography className="text-center" variant="3xl" color="primary-200">Feedback?</Typography>
          <Typography className="text-center" variant="3xl" color="white">Let us know!</Typography>
        </View>
        <Typography
          variant="base"
          className="text-center"
          color="white">
          Gooday is just getting started and
        </Typography>
        <Typography
          variant="base"
          className="text-center"
          color="white">
          growing day by day,
          We rely on your feedback to ensure we help you
        </Typography>
        <Typography
          className="text-center"
          variant="base" color="primary-200">have a Gooday, everyday
        </Typography>
        <Image
          source={require('../../../../assets/Images/Onboarding-Feedback.png')}
          resizeMode="contain"
          style={[tailwind('flex items-center mt-4'),
          { width: '100%', height: SCREEN_HEIGHT * 0.5 }]}
        />
      </View>
    </>
  )
}

export const OnboardContainer: React.FC = () => {
  const tailwind = useTailwind();
  const { data } = useGetUser();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();

  const items = [
    OnboardingStepIntro,
    OnboardingStepFavoritePlaces,
    OnboardingStepMutualAvailability,
    OnboardingStepShareCalendar,
    OnboardingStepTaskList,
    OnboardingStepDailyBriefing,
    OnboardingStepFeedback
  ]

  const onViewableItemsChanged = (items: ViewToken<() => React.JSX.Element>[]) => {
    if (items.length && items[0].index !== null) {
      setActiveIndex(items[0].index)
    }
  }
  const onSkip = async () => {
    // const briefing = await getBriefing();
    // if (briefing) {
    //   navigation.replace('DAILY_BRIEFING_CHAT')
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
  }
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')

  return (
    <View style={tailwind('flex-1 relative bg-[#3596EF]')}>
      <View style={[tailwind('z-50 absolute flex-row px-4 items-center justify-start'), { top: insets.top }]}>
        <View
          style={[
            tailwind("z-50 flex-1 flex-row items-center justify-start py-4"),
            { columnGap: 10 },
          ]}
        >
          {items.map((_, index) => (
            <View
              key={`pagination-${index}`}
              style={tailwind(
                clsx("w-2.5 h-2.5 bg-white rounded-full", {
                  "bg-white w-6 h-3": activeIndex === index,
                })
              )}
            />
          ))}
        </View>
        <Button
          title={(activeIndex === (items?.length - 1) || activeIndex === (items?.length - 2)) ? 'Get Started' : 'Skip'}
          variant="normal"
          color="primary"
          onPress={onSkip}
          style={tailwind('bg-transparent')}
        />
      </View>
      <View style={[tailwind('absolute bottom-0 z-0')]}>
        <OnboardingStepLayout />
      </View>
      <View style={[tailwind('flex-1 absolute left-0 right-0 bottom-0 top-0 z-40')]}>
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({ item: Component }) => (
            <View style={[tailwind('flex flex-1'),
            { height: SCREEN_HEIGHT, width: SCREEN_WIDTH }]}>
              <View style={tailwind('flex-1')}>
                <Component />
              </View>
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={({ viewableItems }) => onViewableItemsChanged(viewableItems)}
        />
      </View>
    </View>
  )
};
