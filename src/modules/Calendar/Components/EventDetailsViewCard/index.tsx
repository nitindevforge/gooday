import React, { FC } from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";
import { getAssetUrl } from "@app/utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventDetailsCardProps } from "./type";
import moment from "moment";
import { BottomTabsNavigatorList } from "src/navigation/BottomTabsNavigator/type";
import { BookingDetailsModal, shadowStyles } from "@app/modules";
import NiceModal from "@ebay/nice-modal-react";

export const EventDetailsViewCard: FC<EventDetailsCardProps> = ({
  item,
  width = 225,
  style,
  disabled = false
}) => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<BottomTabsNavigatorList>>();

  const onNavigate = () => {
    NiceModal?.show(BookingDetailsModal, {
      data: item,
    });
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onNavigate}
      activeOpacity={0.7}
      style={{
        ...shadowStyles.boxShadow1,
        opacity: item?.collaborators.length > 2 ? 0.5 : 1
      }}
    >
      <ImageBackground
        source={item?.image ? item?.image : { uri: getAssetUrl(item?.images?.[0] || item?.venue?.coverPhoto?.[0]) }}
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
        resizeMode={(item?.images?.[0] || item?.venue?.coverPhoto?.[0] || item?.image) ? "cover" : "contain"}
      >
        <View
          style={[
            tailwind(
              "rounded-t-xl items-start justify-between bg-white/90 px-2 py-2"
            ),
            {
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
            <View style={[tailwind("flex-row items-center"), { gap: 2 }]}>
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
                {item?.collaborators?.length}
              </Typography>

              <Image
                source={{ uri: getAssetUrl(item?.users?.[0]?.profile) }}
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
              {item?.title}
            </Typography>
          </View>
          <Typography
            numberOfLines={1}
            variant="sm"
            weight="medium"
            color="gray-200"
          >
            {
              [
                `${moment(item?.startDate).format('h A')} - ${moment(item?.endDate).format('h A')}`,
                item?.venue?.location?.meta?.shortFormattedAddress,
                item?.location?.meta?.shortFormattedAddress,

              ]?.filter(Boolean)?.map((ele) => ele).join(', ')
            }
          </Typography>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
