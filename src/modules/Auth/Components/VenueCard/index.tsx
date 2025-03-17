import React, { FC } from "react";
import { VenueCardProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { Image, TouchableOpacity, View } from "react-native";
import { Icon, Typography } from "@app/ui";
import { getAssetUrl } from "@app/utils";
import clsx from "clsx";

export const VenueCard: FC<VenueCardProps> = ({
  venue,
  onDelete,
  onEdit,
  onPress,
}) => {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        key={venue._id}
        style={tailwind(
          clsx("flex-row items-center justify-between mb-2 p-2 rounded-xl mt-2", {
            "bg-gray-600": (!!onEdit || !!onDelete)
          })
        )}
      >
        <View style={tailwind("flex-row items-center flex-1")}>
          <Image
            source={{
              uri: getAssetUrl(venue?.coverPhoto?.[0]),
            }}
            resizeMode="cover"
            style={tailwind("h-14 w-14 rounded-lg border border-white")}
            defaultSource={require("../../../../assets/Images/photo.png")}
          />
          <View style={tailwind("flex-1 ml-4")}>
            {!!venue?.business?.name && (
              <Typography weight="medium">{venue?.business?.name}</Typography>
            )}
            <Typography numberOfLines={1} color={(!!onEdit || !!onDelete) ? "black" : "gray-300"}>
              {venue?.location?.meta?.shortFormattedAddress}
            </Typography>
            <Typography color={(!!onEdit || !!onDelete) ? "black" : "gray-300"}>{venue?.priceRange}</Typography>
          </View>
        </View>
        <View style={[tailwind("flex-row items-center"), { gap: 10 }]}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit}>
              <Icon name="edit" stroke="none" width={18} height={18} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete}>
              <Icon name="delete" stroke="red" outline width={20} height={20} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={[
          tailwind("border-gray-600"),
          { borderBottomWidth: 1 },
        ]}
      />
    </TouchableOpacity >
  );
};
