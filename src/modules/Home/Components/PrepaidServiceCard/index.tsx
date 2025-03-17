import React, { FC } from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";
import { PrepaidServiceCardProps } from "./type";
import { getAssetUrl } from "@app/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeNavigationParamList } from "../../Navigation";
import { shadowStyles } from "@app/modules";
import moment from "moment";

export const PrepaidServiceCard: FC<PrepaidServiceCardProps> = ({
  item,
  width = 225,
  onNavigateCb = () => { },
  style,
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const onNavigate = () => {

  };

  return (
    <TouchableOpacity
      onPress={onNavigate}
      activeOpacity={0.7}
      style={{
        height: "100%",
        maxHeight: 182,
        width: width,
        ...shadowStyles.boxShadow1,
      }}
    >
      <ImageBackground
        source={item?.image ? item?.image : { uri: getAssetUrl(item?.venue?.coverPhoto?.[0]) }}
        style={[
          tailwind(
            "rounded-xl overflow-hidden border-white bg-transparent justify-end"
          ),
          {
            height: "100%",
            maxHeight: 181,
            width: width,
          },
          style,
        ]}
        defaultSource={require('../../../../assets/Images/logo-primary.png')}
        resizeMode={(item?.venue?.coverPhoto?.[0] || item?.image) ? "cover" : "contain"}
      >
        <View
          style={[
            tailwind(
              "rounded-t-xl items-start justify-between bg-white/90 px-4 py-2"
            ),
            {
              gap: 4,
              maxHeight: 110,
            },
          ]}
        >
          <View style={[tailwind("flex-row w-full items-center justify-between"), {}]}>
            <Typography
              numberOfLines={1}
              className="flex-1"
              variant="base"
              weight="semibold"
            >
              {moment(item?.startDate).format('dddd')}
            </Typography>
            <View style={[tailwind("flex-row items-center"), { gap: 4 }]}>
              <Icon
                name="profile-policy"
                width={16}
                height={16}
                fill="black"
                stroke="none"
                outline={false}
              />
              <Typography
                variant="sm"
                weight="medium"
              >
                {item?.staffs?.length}
              </Typography>

              <Image
                source={{ uri: getAssetUrl(item?.staffs?.[0]?.profilePicture) }}
                defaultSource={require("@app/assets/Images/profile.png")}
                style={[tailwind("rounded-full border border-dark-blue"), { width: 24, height: 24 }]}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={tailwind("flex-row w-full items-center")}>
            <Typography
              numberOfLines={1}
              className="flex-1"
              variant="sm"
              weight="medium"
            >
              {item?.name}
            </Typography>
          </View>
          <Typography
            color="gray-200"
            variant="sm"
            weight="medium"
            numberOfLines={1}
          >
            {
              [
                `${moment(item?.startDate).format('h A')} - ${moment(item?.endDate).format('h A')}`,
                item?.venue?.location?.meta?.shortFormattedAddress,

              ]?.filter(Boolean)?.map((ele) => ele).join(', ')
            }
          </Typography>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
