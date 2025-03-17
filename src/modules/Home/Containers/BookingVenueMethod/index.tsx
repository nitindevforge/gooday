import { Button, Icon, ProgressBar, Typography } from '@app/ui'
import React, { Fragment } from 'react'
import { FlatList, Platform, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderWithLogo, HomeNavigationParamList } from '@app/modules'
import { useTailwind } from 'tailwind-rn'
import { useUserBooking } from '@app/common'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import clsx from 'clsx'
const BOOKING_METHOD = [
  {
    title: 'Standard booking',
    screen: 'INVITE_FRIENDS',
    summary: 'Make a booking with the business. This excludes booking specific services, staff members or ‘What’s On’ events.',
  },
  {
    title: 'Book a service',
    screen: 'ADD_ON',
    type: 'SERVICE',
    summary: 'Book a specific service offered by the business. This may include bookings with specific staff members, memberships and pre-paid options.',
  },
  {
    title: 'Book a ‘What’s On’ event',
    screen: "WHATS_ON",
    summary: 'Book an event sponsored or facilitated by the business. This may include pre-paid ticketed events.',
  }
]

export const BookingVenueMethodContainer = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
  const { updateBooking, booking } = useUserBooking();
  const onMakeBooking = () => {
    updateBooking({
      progress: 45,
      serviceId: null,
      whatsOn: null,
      selectedStaff: null,
      isRecurring: false
    });
    navigation.navigate('INVITE_FRIENDS')
  }

  return (
    <Fragment>
      <SafeAreaView style={tailwind("flex-1")}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={tailwind("flex-1")}>
          <View style={tailwind("px-6 pb-3")}>
            <ProgressBar progress={40} className="mt-4" />
            <HeaderWithLogo
              title={booking?.venueObj?.business?.name ?? ''}
              className="mt-6"
              hideLogo
            />
          </View>
          <View style={tailwind(clsx("px-6 flex-1", {
            "mb-2": Platform.OS === 'android'
          }))}>
            <FlatList
              data={BOOKING_METHOD}
              renderItem={(({ item }) => {
                return (
                  <TouchableOpacity
                    style={[tailwind('flex-1 mt-6 items-start border-b border-gray-600 flex-row')]}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (item?.screen === 'INVITE_FRIENDS') {
                        onMakeBooking()
                      } else if (item?.screen) {
                        updateBooking({
                          progress: 45,
                          serviceId: null,
                          whatsOn: null,
                          selectedStaff: null,
                          isRecurring: false
                        });
                        navigation.navigate(item?.screen, { type: item?.type });
                      }
                    }}
                  >
                    <View style={[tailwind('flex-1 mb-6 mr-6'), { gap: 6 }]}>
                      <Typography weight='semibold' variant='xs'>{item?.title}</Typography>
                      <Typography weight='regular' variant='10'>{item?.summary}</Typography>
                    </View>
                    <Icon
                      name='back'
                      style={{ transform: [{ rotate: '180deg' }] }}
                      width={17}
                      height={22}
                    />
                  </TouchableOpacity>
                )
              })}
              keyExtractor={((item) => item?.title)}
            />
            <Button
              loading={false}
              onPress={onMakeBooking}
              color='primary'
              size='medium'
              title="Next"
            />
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}