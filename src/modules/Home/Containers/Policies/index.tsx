import { ProgressBar, Typography } from '@app/ui';
import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native';
import { HeaderWithLogo, HomeNavigationParamList } from '@app/modules';
import { useTailwind } from 'tailwind-rn';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useUserBooking } from '@app/common';

export const PoliciesContainer = () => {
  const tailwind = useTailwind();
  const { params } =
    useRoute<RouteProp<HomeNavigationParamList, "POLICY">>();
  const { booking } = useUserBooking();

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <View style={tailwind("px-6 flex-1")}>
        {/* <ProgressBar progress={20} className="mt-4" /> */}
        <HeaderWithLogo
          hideLogo
          title={params?.businessName}
          subtitle="Policies"
          className="mt-6"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Typography weight="regular" className="mt-4">
            {params?.policies}
          </Typography>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}