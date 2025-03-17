import React, { FC } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";
import { EventDetailsCardProps } from "./type";
import { getAssetUrl } from "@app/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeNavigationParamList } from "../../Navigation";
import { shadowStyles } from '@app/modules';
import moment from "moment";

export const EventDetailsCard: FC<EventDetailsCardProps> = ({
  item,
  width = 225
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const onNavigate = () => {
    navigation?.navigate("EVENT_DETAILS", { data: item });
  }

  return (
    <TouchableOpacity
      onPress={onNavigate}
      activeOpacity={0.7}
      style={shadowStyles.boxShadow}>
      <ImageBackground
        source={{ uri: getAssetUrl(item?.photos?.[0]) }}
        style={[
          tailwind("rounded-xl overflow-hidden border-white bg-transparent justify-end"),
          {
            height: 157,
            maxHeight: 181,
            width: width
          },
        ]}
        defaultSource={require('@app/assets/Images/logo-primary.png')}
        resizeMode="cover"
      >
        <View
          style={[
            tailwind("rounded-t-xl items-start bg-white/80 px-4 py-2"),
            {
              gap: 4,
            },
          ]}
        >

          <Typography className="" numberOfLines={1} variant="base" weight="semibold">
            {item?.title}
          </Typography>
          <Typography numberOfLines={1} color="gray-200" variant="sm" weight="medium">
            {moment(item?.startDate).format('dddd')}
          </Typography>
          <View style={[tailwind("flex-row items-center"), { gap: 6 }]}>
            <Icon
              name="heart"
              stroke="none"
              width={12}
              height={12}
              fill="#4D4D4D"
            />
            <Typography color="gray-400" variant="sm" weight="medium">
              {item?.favorite ?? 0} friends favourited
            </Typography>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
