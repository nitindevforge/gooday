import {
  Button,
  ProgressBar,
  Typography,
} from "@app/ui";
import React, { useEffect, useMemo } from "react";
import { SafeAreaView, View, Dimensions, ScrollView } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  StaffDetailsCard,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUserBooking } from "@app/common";
import { BusinessStaffEntity } from "@gooday_corp/gooday-api-client";

export const InviteStaffContainer = () => {
  const tailwind = useTailwind();
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "INVITE_STAFF">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { booking, updateBooking } = useUserBooking();

  const onStaffSelection = (value: BusinessStaffEntity, quantity: number, serviceId: string) => {
    updateBooking({
      selectedStaff: value?._id,
      quantity: quantity ?? 0,
      serviceId: serviceId ?? "",
      whatsOn: null,
      isRecurring: params?.data?.service?.isRecurring
    });
  };

  useEffect(() => {
    updateBooking({
      quantity: params?.data?.quantity,
      serviceId: params?.data?.service?._id,
      whatsOn: null,
      isRecurring: params?.data?.service?.isRecurring
    })
  }, [params?.data]);

  return (
    <>
      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 flex-1")}>
          <View style={tailwind("flex-1")}>
            <ProgressBar progress={(booking?.progress ?? 0)! > 0 ? booking?.progress : 20} className="mt-4" />
            <HeaderWithLogo
              title="Select Staff Member"
              className="mt-6"
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Typography weight="medium" variant="lg">
                  {params?.data?.service?.name}
                </Typography>
                <View style={[tailwind('flex-row flex-wrap'), { gap: 12 }]}>
                  {
                    params?.data?.service?.staffs?.map((ele) => {
                      const staffPrice = params?.data?.service?.staffPrice?.find((element) => element?.staff === ele?._id)?.price

                      return (
                        <View style={{ width: Dimensions.get("screen").width / 2 - 34 }}>
                          <StaffDetailsCard
                            active={ele?._id === booking?.selectedStaff}
                            onPress={() => onStaffSelection(ele, params?.data?.quantity, params?.data?.service?._id!)}
                            staff={ele}
                            staffPrice={staffPrice}
                            individualPricingPerStaff={params?.data?.service?.individualPricingPerStaff}
                          />
                        </View>
                      )
                    })
                  }
                </View>
              </View>
            </ScrollView>
          </View>
          <Button
            loading={false}
            disabled={params?.data?.service?.allowSelectGoodayStaff ? !booking?.selectedStaff : true}
            onPress={() => navigation?.navigate("INVITE_FRIENDS")}
            className="my-2"
            title="Next"
          />
        </View>
      </SafeAreaView>
    </>
  );
};
