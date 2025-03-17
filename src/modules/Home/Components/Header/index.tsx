import { Icon, Typography } from "@app/ui";
import React, { FC } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { HeaderProps } from "./type";
import { formatToK, getFormattedDate } from "@app/utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { HomeNavigationParamList } from "../../Navigation";
import { NOTIFICATION } from "../../Utils";
import {
  NotificationBell,
  ProfileNavigationStackParamList,
  useGetUser,
  useNotificationCountMutation,
} from "@app/modules";

export const Header: FC<HeaderProps> = ({
  showDate = false,
  showIcon = true,
  showLogo = false,
  showWether = true,
  darkHeader = false,
  showBackButton = false,
  navigateProfile = false,
  className = ''
}) => {
  const { data } = useGetUser();
  const { data: notification } = useNotificationCountMutation({
    category: [
      NOTIFICATION.INVITES,
      NOTIFICATION.CALENDAR,
      NOTIFICATION.TASKS,
      NOTIFICATION.BOOKING,
      NOTIFICATION.GENERAL,
      NOTIFICATION.REMINDERS,
      NOTIFICATION.WAITLIST,
    ],
  });
  const user = data?.data?.data;

  const { temperature } = user?.weather ?? {};
  const streak = user?.streak ?? 0;

  const tailwind = useTailwind();

  const homeNavigation =
    useNavigation<
      BottomTabNavigationProp<
        HomeNavigationParamList & ProfileNavigationStackParamList
      >
    >();

  const onNotificationNavigate = () => {
    homeNavigation.navigate(
      navigateProfile ? "PROFILE_NOTIFICATION" : "NOTIFICATION"
    );
  };
  return (
    <View style={tailwind(`flex-row justify-between px-6 py-2 ${className}`)}>
      <View>
        {showWether && (
          <View
            style={[
              tailwind("flex-row items-center justify-between"),
              {
                columnGap: 10,
              },
            ]}
          >
            {temperature != null && temperature != undefined && (
              <View
                style={[
                  tailwind("flex-row items-center justify-between"),
                  {
                    columnGap: 10,
                  },
                ]}
              >
                <Icon
                  name="cloud"
                  width={24}
                  height={24}
                  fill={darkHeader ? "white" : "#686969"}
                  stroke="none"
                />
                <Typography
                  weight="medium"
                  variant="sm"
                  color={darkHeader ? "white" : "gray-300"}
                >
                  {Math.ceil(temperature)}°
                </Typography>
              </View>
            )}

            <View
              style={[
                tailwind("flex-row items-center justify-between"),
                {
                  columnGap: 10,
                },
              ]}
            >
              <Icon
                name="fire-alt"
                width={14}
                height={24}
                fill={darkHeader ? "white" : "#686969"}
                stroke="none"
              />
              <Typography
                weight="medium"
                variant="sm"
                color={darkHeader ? "white" : "gray-300"}
              >
                {formatToK(streak)}
              </Typography>
            </View>
          </View>
        )}
        {showBackButton && (
          <TouchableOpacity
            style={tailwind("flex items-start w-7 h-11 justify-center")}
            onPress={() => homeNavigation?.goBack()}
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

        {showDate && (
          <Typography
            variant="sm"
            color="gray-500"
            weight="medium"
            className="mt-1"
          >
            {getFormattedDate("ddd DD/MM")}
          </Typography>
        )}
      </View>
      {showLogo ? (
        <View>
          <Image
            style={tailwind("w-12 h-12")}
            source={require("../../../../assets/Images/logo-primary.png")}
          />
        </View>
      ) : (
        <>
          {showIcon && (
            <View
              style={[
                tailwind("flex-row items-center justify-between"),
                { columnGap: 16 },
              ]}
            >
              <NotificationBell
                onNotificationNavigate={onNotificationNavigate}
                darkHeader={darkHeader}
                notification={notification?.data.data !== 0}
                stroke="none"
              />

              <TouchableOpacity
                onPress={() => {
                  if (navigateProfile) {
                    homeNavigation.navigate("SETTING");
                  } else {
                    homeNavigation.navigate("ACCOUNT_SETTING", {
                      screen: "SETTING",
                    } as any);
                  }
                }}
              >
                <Icon
                  name="settings"
                  width={24}
                  height={24}
                  stroke="none"
                  fill={darkHeader ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};
