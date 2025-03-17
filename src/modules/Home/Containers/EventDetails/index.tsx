import { Button, Icon, Loading, ProgressBar, Typography } from '@app/ui'
import React, { Fragment } from 'react'
import { Image, Linking, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { HeaderWithLogo, HomeNavigationParamList, useGetWhatsOnFavorite, useMarkFavoriteWhatsOnMutation, useUnfavoriteWhatsOnMutation } from '@app/modules'
import { useTailwind } from 'tailwind-rn'
import { getAssetUrl } from '@app/utils'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useUserBooking } from '@app/common'
import clsx from 'clsx'
import { useGetWhatsOnFavoriteCount } from '../../Data/Query/WhatsOnFavoriteCount/index';
import moment from 'moment'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const EventDetailsContainer = () => {
  const tailwind = useTailwind();
  const { params } = useRoute<RouteProp<HomeNavigationParamList, "EVENT_DETAILS">>();
  const { booking, updateBooking } = useUserBooking();
  const { mutate, isLoading: isMarkFavoriteLoading } = useMarkFavoriteWhatsOnMutation();
  const { mutate: unfavorite, isLoading: isUnFavoriteLoading } = useUnfavoriteWhatsOnMutation();
  const { data: likes, refetch: onRefetch } = useGetWhatsOnFavoriteCount(params?.data?._id);
  const { data: favorite, refetch } = useGetWhatsOnFavorite(params?.data?._id);
  const navigation = useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  // const getEventRepeatType = () => {
  //   switch (params?.data?.repeat?.repeat) {
  //     case 'NONE':
  //       return 'None';
  //     case 'EVERY_WEEK':
  //       return 'Every Week';
  //     case 'EVERY_MONTH':
  //       return 'Every Month';
  //     case 'EVERY_YEAR':
  //       return 'Every Year';
  //   }
  // }

  const onFavorite = () => {
    if (favorite?.data?.data?._id) {
      unfavorite(
        { whatsOn: params?.data?._id },
        {
          onSuccess: () => {
            refetch();
            onRefetch()
          },
        }
      );
      return;
    } else {
      mutate(
        { whatsOn: params?.data?._id },
        {
          onSuccess: () => {
            refetch();
            onRefetch()

          },
        }
      );
    }
  };
  const onMakeBooking = () => {
    updateBooking({
      whatsOn: params?.data?._id,
      serviceId: null,
      selectedStaff: null,
      isRecurring: false
    });
    navigation.navigate('INVITE_FRIENDS')
  }

  return (
    <View style={[tailwind("flex-1"), { marginTop: useSafeAreaInsets().top }]}>
      <Loading loading={isMarkFavoriteLoading || isUnFavoriteLoading} />

      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={tailwind("flex-1")}>
        <View style={tailwind("px-6 mb-4")}>
          <ProgressBar progress={35} className="mt-4" />
          <HeaderWithLogo
            title="What’s On"
            className="mt-6"
            hideLogo
          />
        </View>
        <ScrollView style={tailwind("flex-1")} contentContainerStyle={{ paddingBottom: 55 }} showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: getAssetUrl(params?.data?.photos?.[0]) }}
            resizeMode={params?.data?.photos?.length ? 'cover' : 'contain'}
            defaultSource={require('@app/assets/Images/logo-primary.png')}
            style={{ width: 'auto', height: 213 }}
          />
          <View style={tailwind("px-6 mb-4 flex-1")}>
            <View style={[{ gap: 6, flex: 1, }]}>
              <View style={tailwind('flex-row justify-between mt-4')}>
                <Typography weight='medium' variant='2xl'>
                  {params?.data?.title}
                </Typography>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={onFavorite}
                >
                  <Icon
                    name='heart'
                    outline={!favorite?.data?.data?._id}
                    fill='#E24653'
                    width={28}
                    height={28}
                  />
                </TouchableOpacity>
              </View>
              <View style={[tailwind("flex-row items-center"), { gap: 6 }]}>
                <Icon
                  name='location'
                  fill='#3A5ACA'
                  outline={false}
                  width={24}
                  height={24}
                />
                <Typography weight='regular' variant='base'>
                  {params?.data?.location?.meta?.shortFormattedAddress || params?.data?.location?.meta?.formattedAddress}
                </Typography>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[tailwind(clsx('flex-row', {
                  'pt-4': !!booking?.venueObj?.website ||
                    !!booking?.venueObj?.phone ||
                    !!booking?.venueObj?.email
                })),
                { gap: 12 }]}>
                {
                  booking?.venueObj?.website &&
                  <Button
                    variant='outline'
                    iconPosition='left'
                    icon='website'
                    title='Website'
                    onPress={() => Linking.openURL(booking?.venueObj?.website)}
                    iconProps={{
                      name: 'website',
                      fill: '#3A5ACA'
                    }}
                    radius='rounded-full'
                    className='h-10 px-4 flex-1'
                  />
                }
                {
                  booking?.venueObj?.phone &&
                  <Button
                    variant='outline'
                    iconPosition='left'
                    icon='call'
                    onPress={() => Linking.openURL(`tel:$${booking?.venueObj?.phone}`)}
                    title='Call'
                    iconProps={{
                      name: 'call',
                      fill: '#3A5ACA'
                    }}
                    radius='rounded-full'
                    className='h-10 px-4 flex-1'
                  />
                }

                {booking?.venueObj?.email &&
                  <Button
                    variant='outline'
                    iconPosition='left'
                    icon='mail'
                    onPress={() => Linking.openURL(`mailto:${booking?.venueObj?.email}`)}
                    title='Email'
                    iconProps={{
                      name: 'mail',
                      fill: '#3A5ACA',
                      stroke: '#3A5ACA'
                    }}
                    radius='rounded-full'
                    className='h-10 px-4 flex-1'
                  />}
              </ScrollView>
              <View style={[tailwind('flex-row items-center  mt-1'), { gap: 12 }]}>
                <View style={[tailwind('flex-row items-center'), { gap: 12 }]}>
                  <Icon
                    name='heart'
                    fill='#8B8B8B'
                    width={14}
                    height={14}
                  />
                  <Typography color='gray-400' weight='regular' variant='sm'>
                    {likes?.data?.data?.whatsOnFavorite}
                  </Typography>
                </View>
                <View style={[tailwind('flex-row items-center'), { gap: 12 }]}>
                  <Icon
                    name='profile-policy'
                    fill='#8B8B8B'
                    width={14}
                    height={14}
                  />
                  <Typography color='gray-400' weight='regular' variant='sm'>
                    {likes?.data?.data?.whatsOnFavoriteByFriend} Friends favourited
                  </Typography>
                </View>
              </View>
              <Typography color='primary-300' weight='regular' variant='sm'>
                ${params?.data?.price ?? ''}{' '} | {' '}
                {moment(params?.data?.startDate).format('dddd, DD MMMM YYYY')}{' '} | {' '}
                {moment(params?.data?.startDate).format('hh:mm A') + " - " + moment(params?.data?.endDate).format('hh:mm A')}
              </Typography>
              {
                params?.data?.description &&
                <Typography color='gray-200' weight='regular' variant='sm'>
                  {params?.data?.description}
                </Typography>
              }
            </View>
          </View>
        </ScrollView>
        <View style={tailwind("px-6 absolute bottom-4 w-full")}>
          <Button
            loading={false}
            onPress={onMakeBooking}
            color='secondary'
            size='medium'
            title="Make a booking"
          />
        </View>
      </View>
    </View>
  )
}