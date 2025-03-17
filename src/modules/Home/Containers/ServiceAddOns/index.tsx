import { Button, ProgressBar, Typography } from "@app/ui";
import { SafeAreaView, StatusBar, View } from "react-native";
import {
  HeaderWithLogo,
  HomeNavigationParamList,
  ServiceList,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Fragment, useState } from "react";
import { useUserBooking } from "@app/common";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PrepaidServiceEntity } from "@gooday_corp/gooday-api-client";

export const ServiceAddOnsContainer = () => {
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "ADD_ON">>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const tailwind = useTailwind();
  const { updateBooking, booking } = useUserBooking();
  const [purchase, setPurchase] = useState<{ _id: string, quantity: number, service?: PrepaidServiceEntity }>()

  const onNext = () => {
    if (purchase?.service?._id) {
      updateBooking({
        quantity: purchase?.quantity ?? 1,
        prepaid: true,
        progress: 45,
        serviceId: purchase?.service?._id,
        isRecurring: purchase?.service?.isRecurring
      });
      if (purchase?.service?.allowSelectGoodayStaff === true) {
        navigation.navigate('INVITE_STAFF', { data: purchase as any });
      } else {
        navigation.navigate('INVITE_FRIENDS');
      }
    } else {
      updateBooking({
        progress: 45,
        quantity: 1,
      });
      navigation.navigate('INVITE_FRIENDS');
    }
  }
  return (
    <Fragment>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <SafeAreaView style={tailwind("flex-1")}>
        <View style={tailwind("px-6 flex-1")}>
          <ProgressBar progress={40} className="mt-4" />
          <HeaderWithLogo title={booking?.venueObj?.business?.name!} className="mt-6" />
          {
            params?.type === 'EVENT' ?
              <View style={tailwind("mt-4")}>
                <Typography weight="medium" variant="2xl">
                  Cocktail Making Classes
                </Typography>
                <Typography>49, York St Sydney NSW 2000</Typography>
              </View>
              :
              <ServiceList
                setPurchase={setPurchase}
                purchase={purchase}
              />
          }
        </View>
        <View style={tailwind("px-6")}>
          <Button onPress={onNext} className="mb-4 mt-8" title="Next" />
        </View>
      </SafeAreaView>
    </Fragment >
  );
};
