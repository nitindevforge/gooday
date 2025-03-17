import { AvatarGroup, Icon, Typography } from "@app/ui";
import { eventBgColor, eventBorderColor, eventTextColor, getAssetUrl } from "@app/utils";
import clsx from "clsx";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { BookingDetailsCardProps } from "./type";
import moment from "moment";

export const BookingDetailsCard: React.FC<BookingDetailsCardProps> = ({
  data,
  isBooking = true,
}) => {
  const tailwind = useTailwind();

  return (
    <View
      style={[
        tailwind(
          clsx("rounded-lg border-l-4 p-4 w-full", `${eventBgColor?.[data?.eventType]}`)
        ),
        { gap: 12, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, borderColor: eventBorderColor?.[data?.eventType] },
      ]}
    >
      <View style={[tailwind("flex-row items-center"), { gap: 12 }]}>
        <View style={[tailwind("flex-row items-center"), { gap: 4 }]}>
          <Icon
            fill={eventBorderColor?.[data?.eventType]}
            name="profile-policy"
            stroke="none"
            outline={false}
            width={16}
            height={22}
          />
          <Typography weight="regular" variant="base">
            {data?.collaborators?.length}
          </Typography>
        </View>

        <AvatarGroup
          avatars={data?.collaborators?.map((ele) => getAssetUrl(ele?.profile))}
        />
      </View>

      {(data?.location?.meta?.formattedAddress ||
        data?.venue?.location?.meta?.formattedAddress) && (
          <View style={[tailwind("flex-row items-center"), { gap: 6 }]}>
            <Icon
              fill={eventBorderColor?.[data?.eventType]}
              name="location"
              width={16}
              stroke="none"
              outline={false}
              height={16}
            />

            <Typography
              className="flex-1"
              numberOfLines={2}
              weight="regular"
              variant="base"
              color={eventTextColor?.[data?.eventType]}
            >
              {isBooking
                ? data?.venue?.location?.meta?.formattedAddress
                : data?.location?.meta?.formattedAddress
              }
            </Typography>
          </View>
        )}

      <View style={[tailwind("flex-row  items-center"), { gap: 6 }]}>
        <Icon
          fill={eventBorderColor?.[data?.eventType]}
          name="chart-board"
          width={16}
          stroke="none"
          outline={false}
          height={16}
        />
        <Typography
          className="flex-1"
          numberOfLines={2}
          weight="regular"
          variant="base"
          color={eventTextColor?.[data?.eventType]}
        >
          {moment(data?.startDate).format("hh A ddd, MMMM DD, YYYY")}
        </Typography>
      </View>
      {data?.notes && (
        <Typography
          className="flex-1"
          numberOfLines={2}
          weight="light"
          variant="base"
          color={eventTextColor?.[data?.eventType]}
        >
          {data?.notes}
        </Typography>
      )}
    </View>
  );
};
