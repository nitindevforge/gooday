import { Icon, Typography } from "@app/ui";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { UploadImageProps } from "./type";

export const UploadImage: React.FC<UploadImageProps> = ({
  onPress,
  label,
  title
}) => {
  const tailwind = useTailwind();

  return (
    <View>
      {!!label && <Typography>{label}</Typography>}
      <TouchableOpacity
        style={[
          tailwind("flex-col mt-1.5 flex-1 border-gray-600 rounded-lg border items-center py-10"),
          { gap: 10 }
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Icon
          name="add-image"
          width={45}
          height={44}
          fill="#686969"
        />

        {!!title && <Typography color="gray-300">{title}</Typography>}
      </TouchableOpacity>
    </View>
  );
};
