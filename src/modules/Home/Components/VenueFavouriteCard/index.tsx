import React, { FC } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";
import { VenueFavouriteCardProps } from "./type";
import { getAssetUrl } from "@app/utils";
import { useUserBooking } from "@app/common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeNavigationParamList } from "../../Navigation";
import { shadowStyles } from "@app/modules";

export const VenueFavouriteCard: FC<VenueFavouriteCardProps> = ({
  item,
  width = 225,
  onNavigateCb = () => { },
  style,
  disabled = false
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { updateBooking } = useUserBooking();

  const onNavigate = () => {
    updateBooking({
      venueObj: item,
      venue: item?._id,
      business: item.business?._id,
    });
    navigation?.navigate("VENUE_DETAILS", { id: item?._id!, home: true });
    onNavigateCb();
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
        opacity: item?.favoriteCount > 2 ? 0.5 : 1
      }}
    >
      <ImageBackground
        source={item?.image ? item?.image : { uri: getAssetUrl(item?.coverPhoto?.[0]) }}
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
        resizeMode={(item?.coverPhoto?.[0] || item?.image) ? "cover" : "contain"}
      >
        <View
          style={[
            tailwind(
              "rounded-t-xl items-start justify-between bg-white/90 px-2 py-2"
            ),
            {
              gap: 4,
              maxHeight: 110,
            },
          ]}
        >
          <Typography
            numberOfLines={1}
            className=""
            variant="base"
            weight="semibold"
          >
            {item?.business?.name}
          </Typography>
          <View style={[tailwind("flex-row items-center"), { gap: 2 }]}>
            <Icon
              name="profile-policy"
              width={16}
              height={16}
              fill="black"
              stroke="none"
              outline={false}
            />
            {
              item?.favoriteCount > 0 &&
              <Typography
                variant="sm"
                weight="medium"
                numberOfLines={1}
              >
                {item?.favoriteCount ?? 0} Friends’ Favourite
              </Typography>
            }
          </View>
          <Typography
            color="gray-200"
            variant="sm"
            weight="medium"
            numberOfLines={1}
          >
            {item?.location?.meta?.shortFormattedAddress}
          </Typography>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
