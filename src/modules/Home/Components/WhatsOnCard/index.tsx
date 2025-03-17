import React, { FC } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Typography } from "@app/ui";
import { WhatsOnCardProps } from "./type";
import { getAssetUrl } from "@app/utils";
import { shadowStyles } from "@app/modules";
import moment from "moment";

export const WhatsOnCard: FC<WhatsOnCardProps> = ({
  item,
  width = 225,
  onNavigateCb = () => { },
  style,
  disabled = false
}) => {
  const tailwind = useTailwind();

  const onNavigate = () => {
    onNavigateCb()
  };


  return (
    <TouchableOpacity
      disabled={disabled}
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
        source={item?.image ? item?.image : { uri: getAssetUrl((item?.photos?.[0] || item?.whatsOn?.photos?.[0])) }}
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
        resizeMode={
          (item?.photos?.[0] || item?.whatsOn?.photos?.[0] || item?.image) ?
            "cover" : "contain"}
      >
        <View
          style={[
            tailwind(
              "rounded-t-xl items-start justify-between bg-white/90 px-2 py-2"
            ),
            {
              gap: 2,
              maxHeight: 110,
            },
          ]}
        >
          <Typography
            numberOfLines={1}
            variant="base"
            weight="semibold"
          >
            {moment(item?.startDate).format('dddd')}
          </Typography>
          <Typography
            numberOfLines={1}
            variant="sm"
            weight="medium"
          >
            {item?.whatsOn?.title || item?.title || item?.business?.name}
          </Typography>
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
