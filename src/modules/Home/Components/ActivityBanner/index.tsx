import { useGetUser } from "@app/modules";
import { Typography } from "@app/ui";
import { formatToK, getWeatherGreeting } from "@app/utils";
import React from "react";
import { Image, ImageBackground, View } from "react-native";
import { useTailwind } from "tailwind-rn";

export const ActivityBanner = () => {
  const tailwind = useTailwind();
  const { data: user } = useGetUser();
  const { subtitle, title } = getWeatherGreeting();
  const streak = user?.data?.data?.streak ?? 0;

  return (
    <View>
      {!!streak && (
        <View style={tailwind("absolute w-22 h-22 flex-1 -right-9 z-10")}>
          <Image
            source={require("../../../../assets/Images/fire.png")}
            style={[
              {
                resizeMode: "contain",
              },
              tailwind("w-18 h-18"),
            ]}
          />
        </View>
      )}
      <View style={[tailwind("flex items-end mr-7"), { marginBottom: 2 }]}>
        <Typography weight="medium" variant="sm" color="dark-red">
          {formatToK(streak)}
        </Typography>
      </View>
      <ImageBackground
        style={tailwind("w-full rounded-20 overflow-hidden")}
        source={require("../../../../assets/Images/banner-bg-1.png")}
        resizeMode="stretch"
      >
        <View
          style={[
            tailwind("flex-row items-center justify-center h-28"),
            { gap: 40 },
          ]}
        >
          <View style={tailwind("w-24 h-28")} />
          <View style={[{ gap: 2 }, tailwind("flex-1 px-4")]}>
            <Typography weight="medium" variant="xl" color="white">
              {title}
            </Typography>
            <Typography variant="base" color="white" className="leading-5">
              {subtitle}
            </Typography>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
