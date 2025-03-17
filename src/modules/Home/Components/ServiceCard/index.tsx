import React, { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Icon, Typography } from "@app/ui";
import { ServiceCardProps } from "./type";

export const ServiceCard: FC<ServiceCardProps> = ({
  onUpdateQuantity,
  quantity,
  title,
  price = 0,
  subTitle
}) => {
  const tailwind = useTailwind();

  const onIncrement = () => {
    onUpdateQuantity(quantity + 1)
  }

  const onDecrement = () => {
    onUpdateQuantity(quantity - 1)
  }

  return (
    <View
      style={tailwind("flex-row items-center justify-between border-b border-gray-600 pb-6 pl-3")}
    >
      <View>
        <Typography weight="semibold" variant="13">
          {title}
        </Typography>
        <Typography className="mt-2 max-w-[200px]" variant="10">
          {subTitle}
        </Typography>
        {
          !!price &&
          <Typography weight="medium" className="mt-5" variant="sm">
            ${price} pp
          </Typography>
        }
      </View>
      <View
        style={[tailwind("flex-row items-center"), { columnGap: 10 }]}
      >
        <TouchableOpacity
          activeOpacity={1}
          disabled={quantity === 0}
          onPress={onDecrement}
        >
          <Icon fill="#DADADA" name="minus-circle" />
        </TouchableOpacity>
        <View
          style={{
            width: 34,
            height: 39,
            borderWidth: 1,
            borderColor: "#DADADA",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography weight="medium" variant="sm" color="gray-400">
            {quantity || 0}
          </Typography>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onIncrement}
        >
          <Icon fill="#3A5ACA" name="add-circle" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
