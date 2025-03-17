import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";
import { ServiceDetailsCardProps } from "./type";
import { HomeNavigationParamList, shadowStyles } from '@app/modules';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { PrepaidServiceEntity } from "@gooday_corp/gooday-api-client";
import { useUserBooking } from "@app/common";
import moment from "moment";


export const ServiceDetailsCard: FC<ServiceDetailsCardProps> = ({ item }) => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const prices = item?.staffPrice?.map(element => element?.price);
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const { updateBooking } = useUserBooking();
  const onMakeBooking = () => {
    updateBooking({
      serviceId: null,
      quantity: 0,
      isRecurring: false,
      selectedStaff: null
    });

    updateBooking({
      quantity: 1,
      prepaid: true,
      progress: 45,
      isRecurring: item?.isRecurring,
      serviceId: item?._id,
    });
    if (item?.allowSelectGoodayStaff === true) {
      navigation.navigate('INVITE_STAFF', {
        data: {
          _id: item._id,
          quantity: 1,
          service: item as PrepaidServiceEntity
        }
      });
    } else {
      navigation.navigate('INVITE_FRIENDS');
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onMakeBooking}
      style={shadowStyles.boxShadow}>
      <View
        style={[
          tailwind("rounded-xl items-start bg-blue-200 px-4 py-2"),
          {
            gap: 4,
          },
        ]}
      >
        <Typography className="" numberOfLines={1} variant="base" weight="semibold">
          {item?.name}
        </Typography>
        <Typography numberOfLines={1} color="gray-200" variant="sm" weight="medium">
          {moment(item?.startDate).format('dddd')}, {moment(item?.startDate).format('h A')} - {moment(item?.endDate).format('h A')}
        </Typography>
        <View style={[tailwind("flex-row justify-center items-center"), { gap: 6 }]}>
          <Icon
            name="dollar"
            fill="none"
            width={12}
            height={12}
            stroke="#4D4D4D"
          />
          <Typography color="gray-400" variant="sm" weight="medium">
            {item?.price || `${lowest} - ${highest}`}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
};
