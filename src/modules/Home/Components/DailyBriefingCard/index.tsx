import { Icon, Typography } from '@app/ui';
import { getAssetUrl, getWithMore } from '@app/utils';
import moment from 'moment';
import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native';
import { shadowStyles } from '@app/modules';
import { useTailwind } from 'tailwind-rn'
import { DailyBriefingCardProps } from './type';

export const DailyBriefingCard: React.FC<DailyBriefingCardProps> = ({ item, user, onView }) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onView}
      style={[
        tailwind('bg-white rounded-xl mx-2'),
        shadowStyles.boxShadow
      ]}>
      <View style={[
        tailwind('flex-row p-2'),
        { gap: 28 }
      ]}>
        <View style={tailwind('flex-1')}>
          <Typography numberOfLines={1} weight="semibold" variant="xl">{item?.title}</Typography>
          <Typography weight="medium" variant="base">{moment(item?.startDate).format('hh:mm A')} - {moment(item?.endDate).format('hh:mm A')}</Typography>
          {!!(item?.venue?.location?.meta?.shortFormattedAddress || item?.location?.meta?.shortFormattedAddress) &&
            <View style={[tailwind('flex-row items-center'), { gap: 4 }]}>
              <Icon
                name="location"
                outline={false}
                fill="#292D32"
                width={16}
                height={16}
              />
              <Typography className="" numberOfLines={1} weight="medium" variant="base">{(item?.venue?.location?.meta?.shortFormattedAddress || item?.location?.meta?.shortFormattedAddress)}</Typography>
            </View>}

          {
            getWithMore(item?.users, [user?._id!])?.length > 1 &&
            <View style={[tailwind('flex-row items-center'), { gap: 4 }]}>
              <Icon
                fill="black"
                name="profile-policy"
                stroke="none"
                outline={false}
                width={16}
                height={16}
              />
              <Typography numberOfLines={1} weight="medium" variant="base">
                {getWithMore(item?.users, [user?._id!])}
              </Typography>
            </View>
          }
        </View>
        <Image
          source={{ uri: getAssetUrl(item?.venue?.coverPhoto?.[0] || item?.images?.[0]) }}
          style={[tailwind('rounded-xl'), { width: 90, height: 90, }]}
          resizeMode="cover"
          defaultSource={require('../../../../assets/Images/logo-primary.png')}
        />
      </View>
    </TouchableOpacity>
  )
}