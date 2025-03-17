import { useTailwind } from "tailwind-rn";
import React, { FC } from "react";
import {
  Icon,
  Loading,
  Typography,
} from "@app/ui";
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  useGetUser,
  useUpdateStreak,
} from "@app/modules";
import { Assistant } from "@app/components";
import clsx from "clsx";
import { getFormattedDate, getKeyWithUserID } from "@app/utils";
import { storageService } from "@app/services";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationParamList } from "@app/navigation";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import { useNavigation } from "@react-navigation/native";
import { DAILY_BRIEFING } from "@app/api";


export const DailyBriefingChatContainer: FC<{ showNextButton?: boolean }> = ({
  showNextButton,
}) => {
  const tailwind = useTailwind();
  const { data, isLoading } = useGetUser();
  const { mutateAsync } = useUpdateStreak();

  const navigation =
      useNavigation<
        NativeStackNavigationProp<
          HomeNavigationParamList &
            RootNavigationParamList &
            BottomTabsNavigatorList
        >
      >();

  const updateActivity = async () => {
      await mutateAsync();
      const key = await getKeyWithUserID(DAILY_BRIEFING);
      await storageService.setItem(key, getFormattedDate("L"));
      if (data?.data?.data?.role === "business") {
        navigation.replace("APP", {
          screen: "HOME",
          params: {
            screen: "BUSINESS_HOME",
          },
        } as any);
      } else {
        navigation.replace("APP");
      }
    };

  return (
    <SafeAreaView
      style={[
        tailwind("flex-1"),
      ]}
    >
      <Loading loading={isLoading} />
      <View style={tailwind("flex-1")}>
      <View
            style={tailwind(
              clsx("flex-row mt-4 px-6", {
                "mt-4": Platform.OS === "android",
              })
            )}
          >
            <Typography weight="semibold" variant="2xl">
              Daily Briefing
            </Typography>
            {!!showNextButton && (
              <TouchableOpacity
                onPress={updateActivity}
                activeOpacity={0.1}
                style={[tailwind("flex-1 justify-end flex-row"), { gap: 12 }]}
              >
                <Icon name="home" width={22} height={22} />
                <Icon
                  name="back"
                  style={{
                    transform: [
                      {
                        rotate: "180deg",
                      },
                    ],
                  }}
                  width={14}
                  height={22}
                />
              </TouchableOpacity>
            )}
          </View>
        <View style={[tailwind('flex-1 items-center'), {}]}>
          <Assistant
            id={data?.data?.data?._id}
            profile
            resizeMode="contain"
            style={{ width: 270, height: 282 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
