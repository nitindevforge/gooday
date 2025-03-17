import { AvatarGroup, Icon, Typography } from '@app/ui'
import { eventBgColor, getAssetUrl } from '@app/utils'
import clsx from 'clsx'
import React from 'react'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { BookingDetailsCardProps } from './type'
import moment from 'moment'

export const BookingCancelCard: React.FC<BookingDetailsCardProps> = ({ data }) => {
  const tailwind = useTailwind()

  return (
    <View
      style={[
        tailwind(
          clsx(
            "rounded-lg p-4 w-full",
            `${eventBgColor?.[data?.eventType]}`
          )
        ),
        { gap: 12 },
      ]}
    >
      <View style={{ gap: 12 }}>
        <Typography weight="medium" variant="base">
          Booking Information
        </Typography>

        <Typography weight="medium" variant="base">
          {data?.business?.name}
        </Typography>
      </View>
      <View
        style={[tailwind("flex-row items-center"), { gap: 12 }]}
      >
        <View style={[tailwind("flex-row"), { gap: 5 }]}>
          <Icon
            fill="black"
            name="profile-policy"
            stroke="none"
            width={16}
            outline={false}
            height={22}
          />
          <Typography weight="regular" variant="base">
            {data?.collaborators?.length}
          </Typography>
        </View>

        <AvatarGroup
          avatars={data?.collaborators?.map((ele) =>
            getAssetUrl(ele?.profile)
          )}
        />
      </View>

      <View style={[tailwind("flex-row items-start"), { gap: 6 }]}>
        <Icon
          fill="#2E2E2E"
          name="location"
          width={16}
          height={20}
        />
        <Typography
          className="flex-1"
          numberOfLines={2}
          weight="regular"
          variant="base"
        >
          {data?.venue?.location?.meta?.formattedAddress}
        </Typography>
      </View>

      <View style={[tailwind("flex-row  items-start"), { gap: 6 }]}>
        <Icon
          fill="#2E2E2E"
          name="location"
          width={16}
          height={20}
        />
        <Typography
          className="flex-1"
          numberOfLines={2}
          weight="regular"
          variant="base"
        >
          {moment(data?.startDate).format(
            "hh A ddd, MMMM DD, YYYY"
          )}
        </Typography>
      </View>
    </View>
  )
}